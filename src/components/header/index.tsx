import Link from "next/link";
import styles from "./header.module.scss";
import { Typography, Button } from "..";

const Header: React.FC = () => {
  return (
    <div className={styles["header"]}>
      <Link href={"/"}>
        <img
          src="/icons/podriff-icon.svg"
          alt="podriff-icon"
          width={42}
          height={42}
        />
      </Link>
      <div className={styles["details-area"]}>
        <Typography style={{ textDecoration: "underline", cursor: "pointer" }}>
          1 free podcast left
        </Typography>
        <Button buttonType="alternate">
          <img src="/icons/upgrade-button-icon.svg" alt="upgrade" width={20} height={20} />
          <Typography color="white">Upgrade</Typography>
        </Button>
        <Typography className={styles["user-icon"]}>S</Typography>
      </div>
    </div>
  );
};

export default Header;
