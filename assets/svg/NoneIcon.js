import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function NoneIcon(props) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {/* Optional white background path */}
      <Path d="M0 0h24v24H0z" fill="#ffffff" />
      
      {/* Pencil/edit shape */}
      <Path
        d="M6.921 18.421L5.579 17.079C5.435 16.935 5.363 16.764 5.363 16.564C5.363 16.364 5.435 16.193 5.579 16.049L16.049 5.579C16.192 5.435 16.364 5.363 16.564 5.363C16.764 5.363 16.935 5.435 17.079 5.579L18.421 6.921C18.564 7.065 18.636 7.236 18.636 7.436C18.636 7.636 18.564 7.807 18.421 7.951L7.927 18.421C7.783 18.565 7.615 18.636 7.424 18.636C7.232 18.636 7.064 18.565 6.921 18.421Z"
        fill="#000000"
      />
    </Svg>
  );
}

export default NoneIcon;
