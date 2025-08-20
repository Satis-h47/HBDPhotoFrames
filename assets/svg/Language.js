import * as React from "react";
import Svg, { G, Path, ClipPath, Defs, Rect } from "react-native-svg";

function Language(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <ClipPath id="clip">
          <Rect x="1" y="1" width="22" height="22" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip)">
        {/* Outer circle */}
        <Path
          d="M22.359 12C22.359 17.719 17.723 22.355 12.004 22.355C6.285 22.355 1.648 17.719 1.648 12C1.648 6.281 6.285 1.645 12.004 1.645C17.723 1.645 22.359 6.281 22.359 12Z"
          stroke="#000"
          strokeWidth={1.3}
          fill="none"
        />

        {/* Inner oval (latitudinal ring) */}
        <Path
          d="M17.361 12C17.361 17.719 14.961 22.355 12.001 22.355C9.04 22.355 6.641 17.719 6.641 12C6.641 6.281 9.04 1.645 12.001 1.645C14.961 1.645 17.361 6.281 17.361 12Z"
          stroke="#000"
          strokeWidth={1.3}
          fill="none"
        />

        {/* Vertical line (longitude) */}
        <Path
          d="M12 1.645V22.355"
          stroke="#000"
          strokeWidth={1.3}
          fill="none"
        />

        {/* Horizontal Equator */}
        <Path
          d="M1.625 12H22.379"
          stroke="#000"
          strokeWidth={1.3}
          fill="none"
        />

        {/* Upper horizontal line */}
        <Path
          d="M3.031 6.822H20.971"
          stroke="#000"
          strokeWidth={1.3}
          fill="none"
        />

        {/* Lower horizontal line */}
        <Path
          d="M2.789 17.178H20.969"
          stroke="#000"
          strokeWidth={1.3}
          fill="none"
        />
      </G>
    </Svg>
  );
}

export default Language;

