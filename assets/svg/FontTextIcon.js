import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function FontTextIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {/* Magnifying glass and handle */}
      <Path
        d="M14.28 16.481L13.406 13.328L16.481 14.262L20.761 18.551C21.371 19.162 21.371 20.151 20.761 20.761C20.151 21.371 19.162 21.371 18.551 20.761L14.28 16.481Z"
        stroke="#93B926"
        strokeWidth={1.3}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M19.91 17.996L18.074 19.832"
        stroke="#93B926"
        strokeWidth={1.3}
        strokeLinejoin="round"
        fill="none"
      />

      {/* Document + search input */}
      <Path
        d="M13.563 12V5.906H18.094V9.07H21.219V4.344C21.219 3.481 20.519 2.781 19.656 2.781H4.344C3.481 2.781 2.781 3.481 2.781 4.344V9.07H5.906V5.906H10.438V21.219H13.563V18"
        stroke="#93B926"
        strokeWidth={1.3}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export default FontTextIcon;
