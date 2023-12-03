import { Actions } from "@/enums/actions";
import { Action } from "./action";
import State from "./statemodel";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
