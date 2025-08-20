import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CheckIcon({color = '#FFFFFF', ...props}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill={color}
      />
    </Svg>
  );
}

export default CheckIcon;
