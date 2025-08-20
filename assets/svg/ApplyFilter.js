import * as React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

function ApplyFilter(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Defs>
        <ClipPath id="clip0">
          <Rect x="2" y="2" width="20" height="20" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0)">
        {/* Dots */}
        <Path
          d="M14.188 15.281C14.188 15.713 14.537 16.063 14.969 16.063C15.4 16.063 15.75 15.713 15.75 15.281C15.75 14.85 15.4 14.5 14.969 14.5C14.537 14.5 14.188 14.85 14.188 15.281Z"
          fill="#EB5F83"
        />
        <Path
          d="M14.188 2.781C14.188 3.213 14.537 3.563 14.969 3.563C15.4 3.563 15.75 3.213 15.75 2.781C15.75 2.35 15.4 2 14.969 2C14.537 2 14.188 2.35 14.188 2.781Z"
          fill="#EB5F83"
        />

        {/* Diagonal line */}
        <Path
          d="M4.344 21.219C3.944 21.219 3.544 21.066 3.239 20.761C2.629 20.151 2.629 19.162 3.239 18.552L13.864 7.927C14.474 7.316 15.463 7.316 16.073 7.927C16.684 8.537 16.684 9.526 16.073 10.136L5.448 20.761C5.143 21.066 4.744 21.219 4.344 21.219Z"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Plus icon bottom right */}
        <Path
          d="M19.656 12.156V15.281"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.094 13.719H21.219"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Plus icon top right */}
        <Path
          d="M19.656 2.781V5.906"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.094 4.344H21.219"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Plus icon top left */}
        <Path
          d="M10.281 2.781V5.906"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.719 4.344H11.844"
          fill="none"
          stroke="#EB5F83"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export default ApplyFilter;
