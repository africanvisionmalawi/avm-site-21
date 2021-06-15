import { Link } from "gatsby";
import React from "react";
import * as styles from "../pageLinks/pageLinks.module.css";

export const MoreButton = ({ url }) => {
  return (
    <>
      {url ? (
        <Link to={url} className={styles.btn}>
          Find out more
        </Link>
      ) : null}
    </>
  );
};
