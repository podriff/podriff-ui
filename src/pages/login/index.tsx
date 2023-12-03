import { Button, Typography } from "@/components";
import styles from "./login.module.scss";
import { useEffect, useState } from "react";
import { isEmailValid, pxToRem } from "@/utils";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const Onboard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = () => {
    setLoading(true);
    localStorage.setItem("podriff_email", email);
    auth
      .sendSignInLinkToEmail(email, {
        url: `${window.location.origin}/profile`,
        handleCodeInApp: true,
      })
      .then(() => {
        setEmail("");
        setInfo("We have sent you a link to sign in!");
      })
      .catch((error) => {
        setInfo(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleOnChange = (email: string) => {
    setEmail(email);
    setInfo(email && !isEmailValid(email) ? "Please enter a valid email" : "");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) router.push("/profile");
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className={`${styles["login-page"]} container`}>
      <input
        className={styles["email-input"]}
        placeholder="hello@example.com"
        onChange={(e) => handleOnChange(e.target.value)}
        value={email}
        defaultValue={email}
      />
      <div
        style={{
          textAlign: "center",
          width: pxToRem(500),
          wordBreak: "break-word",
        }}
      >
        <Button
          buttonType="alternate"
          borderRadius="curved"
          className={styles["submit-button"]}
          disabled={!email || !isEmailValid(email) || loading}
          onClick={() => onSubmit()}
        >
          <Typography color="white">
            {loading ? "Please wait..." : "Submit"}
          </Typography>
        </Button>
        {info ? <Typography variant="span">{info}</Typography> : null}
      </div>
    </div>
  );
};

export default Onboard;
