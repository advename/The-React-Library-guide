import React from "react";
import lodash from "lodash";

export type ButtonProps = {
  /**
   * Text to display for the button
   */
  text: string;
};

export function Button(props: ButtonProps) {
  const x = lodash.last([1, 2, 3]);
  return <button>{props.text}</button>;
}
