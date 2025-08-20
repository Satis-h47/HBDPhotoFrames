import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackArrow = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      fill="#000" // white fill
    />
  </Svg>
);

export default BackArrow;
