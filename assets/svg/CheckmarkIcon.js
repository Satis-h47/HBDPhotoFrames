import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CheckmarkIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M2.898 11.933L8.965 18L21.098 5"
        stroke="#EB5F83"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CheckmarkIcon;
