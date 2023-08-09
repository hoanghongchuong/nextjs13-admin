import React from "react";
import { FadeLoader } from "react-spinners";
import styles from "./loading.module.css";

// const override = CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red"
// };

export default function LoadingCustom(props) {
  const { size } = props;
  return (
    <div className={styles.loading}>
      <FadeLoader color={"#37D7B7"} size={size ?? 15} />
    </div>
  );
}
