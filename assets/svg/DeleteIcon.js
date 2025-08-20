import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DeleteIcon = ({fill = "#ffffff", ...props}) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M5.75 23C5.063 23 4.474 22.761 3.985 22.283C3.496 21.804 3.251 21.229 3.25 20.556V4.667H2V2.222H8.25V1H15.75V2.222H22V4.667H20.75V20.556C20.75 21.228 20.505 21.803 20.016 22.283C19.527 22.762 18.938 23.001 18.25 23H5.75ZM8.25 18.111H10.75V7.111H8.25V18.111ZM13.25 18.111H15.75V7.111H13.25V18.111Z"
      fill={fill}
    />
  </Svg>
);

export default DeleteIcon;
