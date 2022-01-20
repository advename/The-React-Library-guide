import * as React from "react";
import { SVGProps } from "react";

const SvgPin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.48 122.88"
    {...props}
  >
    <path
      d="M121.21 36.53 85.92 1.23c-3-3-7.77.1-9.2 2.74-.24.45.19.86-.2 3.92a46.27 46.27 0 0 1-2.72 11.32l-15.69 15.7c-6.27 6.26-15.23 3.48-22.87-.32-1.62-.8-3.69-2.57-5.48-.78l-6.64 6.64a2.49 2.49 0 0 0 0 3.53L78.9 99.76a2.5 2.5 0 0 0 3.53 0l6.64-6.64c1.77-1.77-.49-4.06-1.41-6-3.4-7-6.45-16.41-.78-22.08l16.39-16.39a84.14 84.14 0 0 1 11.35-2.57c3.09-.49 3.47-.11 3.91-.4 2.71-1.74 5.7-6.15 2.68-9.17Z"
      style={{
        fillRule: "evenodd",
        fill: "#2470bd",
      }}
    />
    <path
      style={{
        fill: "#1a1a1a",
        fillRule: "evenodd",
      }}
      d="M53.48 82.11 40.77 69.4 0 120.96l1.92 1.92 51.56-40.77z"
    />
  </svg>
);

export default SvgPin;