import { ReactNode } from "react";
import styles from "./wrapper.module.scss";
import { Header } from "..";

type Wrapper = {
  children: ReactNode;
};

const Wrapper: React.FC<Wrapper> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles["fake-div"]}></div>
      <div className={styles["wrapper"]}>{children}</div>
    </>
  );
};

export default Wrapper;
