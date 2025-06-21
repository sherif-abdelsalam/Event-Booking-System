import styles from "./loader.module.css";
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <span className={styles.loader}></span>
    </div>
  );
}
