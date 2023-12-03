import styles from "./loader.module.scss";

const Loader = () => {
    return <div className={styles["loader-wrapper"]}>
        <div className={styles["loader"]}></div>
    </div>
}

export default Loader;
