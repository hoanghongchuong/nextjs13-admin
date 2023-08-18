import React from "react";
import { FadeLoader } from "react-spinners";
import styles from "./loading.module.css";


export default function LoadingCustom(props) {
  const { size } = props;
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner}></div>
      {/* <FadeLoader color={"#37D7B7"} size={size ?? 15} /> */}
    </div>
  );
}
