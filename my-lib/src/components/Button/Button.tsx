import React from "react";
import { last } from "lodash-es"; // ESM version of lodash
// import dog from "./../../../assets/dog.jpg";

import { Pin } from "./../../icons";
import styles from "./Button.module.scss";

export type ButtonProps = {
  /**
   * Text to display for the button
   */
  text: string;
};

export function Button(props: ButtonProps) {
  const lastVal = last([1, 2, 3]);
  return (
    <div className={styles.banana}>
      <Pin />
      <button>
        {props.text} -T {lastVal}
      </button>
    </div>
  );
}
