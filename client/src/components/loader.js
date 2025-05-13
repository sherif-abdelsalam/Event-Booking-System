import styles from './loader.module.css';
export default function Loader() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <span className={styles.loader}></span>
        </div>
    );
}