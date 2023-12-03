import { createContext, useEffect, useReducer } from "react";
import { Action } from "./action";
import reducer from "./reducer";
import initialState from "./state";
import State from "./statemodel";
import React from "react";
import { Actions } from "@/enums/actions";
import { auth, firestoreDB } from "@/firebase";

interface ContextProps {
  children: React.ReactNode;
}

export const AppContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const AppContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUser = async () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let freeCreditsUsed = false;

        const userSnapshot = await firestoreDB
          .collection("users")
          .where("email", "==", user?.email)
          .get();
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0].data();
          freeCreditsUsed = userDoc["freeCreditsUsed"];
        }

        const videoSnapshot = await firestoreDB
          .collection("videos")
          .where("email", "==", user.email)
          .get();

        dispatch({
          type: Actions.SET_USER,
          payload: {
            email: user?.email,
            freeCreditsUsed,
            userVideos: videoSnapshot.empty
              ? []
              : videoSnapshot.docs.map((d) => ({...d.data(), docId: d.id})),
          },
        });
      }
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    loadUser();
  }, [auth]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
