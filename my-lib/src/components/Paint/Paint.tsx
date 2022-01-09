// @ts-nocheck
import React from "react";
import { last } from "lodash-es"; // ESM version of lodash
// import dog from "./../../../assets/dog.jpg";
// import dog from "./dog.jpg";
import pin from "./push-pin-blue.svg";

export type ButtonProps = {
  /**
   * Text to display for the button
   */
  text: string;
};

export function Paint(props: ButtonProps) {
  const lastVal = last([1, 2, 3]);
  return (
    <div>
      <img src={pin} alt="Logo" />
      <button>
        {props.text} -T {lastVal}
      </button>
    </div>
  );
}
