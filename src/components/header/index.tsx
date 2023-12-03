import Link from "next/link";
import styles from "./header.module.scss";
import { Typography, Button } from "..";
import { useContext } from "react";
import { AppContext } from "@/context";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [state] = useContext(AppContext);

  const router = useRouter();

  const onLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles["header"]}>
      <Link href={"/profile"}>
        <img
          src="/icons/podriff-icon.svg"
          alt="podriff-icon"
          width={42}
          height={42}
        />
      </Link>
      {state.user?.email ? (
        <div className={styles["details-area"]}>
          {state.user.freeCreditsUsed ? null : (
            <Link href={"/profile/new"}>
              <Typography
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                1 free podcast left
              </Typography>
            </Link>
          )}
          <Button buttonType="alternate">
            <img
              src="/icons/upgrade-button-icon.svg"
              alt="upgrade"
              width={20}
              height={20}
            />
            <Typography color="white">Upgrade</Typography>
          </Button>
          <Button onClick={onLogout}>
            <Typography color="white">Logout</Typography>
          </Button>
        </div>
      ) : (
        <Link href={"/login"}>
          <Button buttonType="alternate">
            <Typography color="white">Login</Typography>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
