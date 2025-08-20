import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function EditTextIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {/* Corner squares */}
      <Path
        d="M22.354 5.097H18.902V1.645H22.354V5.097Z"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.096 5.097H1.645V1.645H5.096V5.097Z"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.354 22.355H18.902V18.904H22.354V22.355Z"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.096 22.355H1.645V18.904H5.096V22.355Z"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Outer lines */}
      <Path
        d="M5.098 3.37H18.905"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.098 20.63H18.905"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.629 5.096V18.903"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.371 5.096V18.903"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center plus/box */}
      <Path
        d="M6.82 6.822V10.274H10.272V17.178H13.724V10.274H17.176V6.822H6.82Z"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.582 17.178H14.415"
        fill="none"
        stroke="#926"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default EditTextIcon;
