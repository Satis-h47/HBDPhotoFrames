import * as React from "react";
import Svg, { G, Path, ClipPath, Defs, Rect } from "react-native-svg";

function Home(props) {
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
        {/* Roof */}
        <Path
          d="M1.859 12.859L12 2.547L22.141 12.859"
          stroke="#000"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* House Body */}
        <Path
          d="M20.422 11.141V21.453H15.438V14.578C15.438 13.629 14.668 12.859 13.719 12.859H10.281C9.332 12.859 8.563 13.629 8.563 14.578V21.453H3.578V11.141"
          stroke="#000"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Floor line */}
        <Path
          d="M8.563 21.453H15.438"
          stroke="#000"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Door line */}
        <Path
          d="M10.281 9.422H13.719"
          stroke="#000"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Chimney */}
        <Path
          d="M17.156 7.703V4.266"
          stroke="#000"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  );
}

export default Home;
