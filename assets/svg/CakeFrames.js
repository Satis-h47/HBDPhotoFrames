import * as React from "react";
import Svg, { G, Path, ClipPath, Defs, Rect } from "react-native-svg";

function CakeFrames(props) {
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
          <Rect x={2} y={1} width={20} height={21} />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip)">
        {/* Left and right connection arcs */}
        <Path
          d="M11.688 11.916C15.644 12.152 18.807 15.462 18.807 19.475V21.414"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M3.664 21.414V19.475C3.664 15.447 6.852 12.127 10.829 11.914"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Head circle */}
        <Path
          d="M11.231 11.939C13.807 11.939 15.908 9.839 15.908 7.263C15.908 4.687 13.807 2.586 11.231 2.586C8.656 2.586 6.555 4.687 6.555 7.263C6.555 9.839 8.656 11.939 11.231 11.939Z"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Torso box */}
        <Path
          d="M7.719 21.414V17.664C7.719 17.234 8.07 16.883 8.5 16.883H13.969C14.399 16.883 14.75 17.234 14.75 17.664V21.414"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Three small vertical indicators */}
        <Path d="M11.234 15.672V16.889" stroke="#ffffff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M13.578 15.672V16.889" stroke="#ffffff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M8.891 15.672V16.889" stroke="#ffffff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Bottom details */}
        <Path
          d="M14.438 19.227H13.461C12.945 19.227 12.523 19.648 12.523 20.164V20.633"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M8.266 19.227H11.586C12.102 19.227 12.523 19.648 12.523 20.164V20.633"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path d="M10.063 19.617V19.969" stroke="#ffffff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Hair or wave lines near head */}
        <Path
          d="M15.719 6.424C15.263 6.616 14.762 6.722 14.237 6.722C13.017 6.722 11.93 6.151 11.229 5.262C10.528 6.151 9.442 6.722 8.222 6.722C7.655 6.722 7.117 6.598 6.633 6.377"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right-side extra biometrics */}
        <Path
          d="M14.133 3.373C16.484 1.388 18.762 3.567 18.76 5.383C18.759 6.654 18.408 9.175 20.335 9.584C19.965 11.487 16.471 12.043 15.296 10.007"
          stroke="#ffffff"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  );
}

export default CakeFrames;
