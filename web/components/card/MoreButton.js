import styles from "components/pageLinks/pageLinks.module.css";

export const MoreButton = ({ url }) => {
  return (
    <>
      {url ? (
        <a href={url} className={styles.btn}>
          Find out more
        </a>
      ) : null}
    </>
  );
};
