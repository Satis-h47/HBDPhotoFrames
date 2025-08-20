import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M9.75 5H21M3 11.5H21H6.375M3 18H14.25"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export default MenuIcon;

