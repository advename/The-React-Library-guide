import React from "react";

export type ButtonProps = {
  /**
   * Text to display for the button
   */
  text: string;
};

export function Button(props: ButtonProps) {
  return <button>{props.text}</button>;
}
