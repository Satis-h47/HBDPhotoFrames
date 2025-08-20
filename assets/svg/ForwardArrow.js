import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ForwardArrow = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6 -6z"
      fill="#000" // white fill
    />
  </Svg>
);

export default ForwardArrow;
