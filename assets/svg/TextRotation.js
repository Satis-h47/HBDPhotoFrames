import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TextRotation(props) {
  return (
    <Svg
      width={25}
      height={23}
      viewBox="0 0 25 23"
      fill="none"
      {...props}
    >
      {/* Circular outline */}
      <Path
        d="M22 12.061C22 17.55 17.523 22 12 22C6.477 22 2 17.55 2 12.061C2 6.572 6.477 2.122 12 2.122C12.065 2.122 13.347 2.123 13.412 2.124"
        stroke="#f9a825"
        strokeWidth={1.3}
        fill="none"
      />

      {/* Arrow line */}
      <Path
        d="M10.93 4.244L13.065 2.122L10.93 0"
        stroke="#f9a825"
        strokeWidth={1.3}
        fill="none"
      />

      {/* Plus sign */}
      <Path
        d="M7 7V10.452H10.452V17.355H13.904V10.452H17.355V7H7Z"
        stroke="#f9a825"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default TextRotation;
