import { useRouter } from "next/router";
import { Typography } from "..";
import styles from "./backbutton.module.scss";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles["back-button"]} onClick={() => router.back()}>
      <img src="/icons/arrow-left-icon.svg" alt="back" width={16} height={12} />
      <Typography variant="span" color="black-light">
        Back
      </Typography>
    </div>
  );
};

export default BackButton;
