import React from "react";
import { last } from "lodash-es"; // ESM version of lodash

export type ButtonProps = {
  /**
   * Text to display for the button
   */
  text: string;
};

export function Button(props: ButtonProps) {
  const lastVal = last([1, 2, 3]);
  return <button>{props.text} - {lastVal}</button>;
}
