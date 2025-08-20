import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CloseIcon({fill = "#ffffff", ...props}) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill={fill}
      />
    </Svg>
  );
}

export default CloseIcon;
