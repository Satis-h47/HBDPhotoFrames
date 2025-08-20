import * as React from "react";
import Svg, { G, Path, ClipPath, Defs, Rect } from "react-native-svg";

function Creations({fill = "#000" ,...props}) {
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
          <Rect width={24} height={24} />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip)">
        {/* Curved inner flames */}
        <Path
          d="M10.602 12C10.602 12 12.008 14.109 12.008 16.219"
          stroke={fill}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M13.414 12C13.414 12 12.008 14.109 12.008 16.219"
          stroke={fill}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M12.008 17.625V16.219"
          stroke={fill}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Radiating lines and spark symbols */}
        <Path d="M0.711 12H2.117" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M21.898 12H23.305" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M12.008 2.109V0.703" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M7.086 3.474L6.383 2.256" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M21.749 17.625L20.531 16.922" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M3.476 7.078L2.258 6.375" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M21.749 6.375L20.531 7.078" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M3.476 16.922L2.258 17.625" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M17.633 2.256L16.93 3.474" stroke={fill} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Flame body */}
        <Path
          d="M17.633 12C17.633 8.667 14.734 6.011 11.319 6.416C8.869 6.707 6.827 8.669 6.452 11.108C6.143 13.116 6.898 14.958 8.238 16.167C9.35 17.17 9.898 18.657 9.898 20.154V21.188C9.898 22.353 10.843 23.297 12.008 23.297C13.173 23.297 14.117 22.353 14.117 21.188V20.234C14.117 18.71 14.655 17.183 15.785 16.16C16.919 15.134 17.633 13.651 17.633 12Z"
          stroke={fill}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Bottom line of flame base */}
        <Path
          d="M9.898 20.438H14.117"
          stroke={fill}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  );
}

export default Creations;
