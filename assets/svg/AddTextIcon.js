import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AddTextIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {/* Medical cross top curve */}
      <Path
        d="M14.898 11.848C14.898 11.005 15.582 10.322 16.424 10.322H19.475C20.318 10.322 21.001 11.005 21.001 11.848"
        stroke="#69CFC5"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Vertical part of the medical cross */}
      <Path
        d="M17.953 10.322V16.424"
        stroke="#69CFC5"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Horizontal part of the medical cross */}
      <Path
        d="M16.422 16.424H19.473"
        stroke="#69CFC5"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Book or document base */}
      <Path
        d="M12.153 13.373V16.424C12.153 17.266 12.836 17.949 13.679 17.949C14.521 17.949 15.204 18.632 15.204 19.475C15.204 20.317 14.521 21 13.679 21H7.577C6.734 21 6.051 20.317 6.051 19.475C6.051 18.632 6.734 17.949 7.577 17.949C8.419 17.949 9.102 17.266 9.102 16.424V7.576C9.102 6.734 8.419 6.051 7.577 6.051H7.16C6.639 6.051 6.119 6.298 5.876 6.76C5.621 7.245 5.112 7.576 4.526 7.576C3.683 7.576 3 6.893 3 6.051V4.525C3 3.683 3.683 3 4.526 3H16.73C17.572 3 18.255 3.683 18.255 4.525V6.051C18.255 6.893 17.573 7.576 16.73 7.576C16.143 7.576 15.634 7.245 15.379 6.76C15.136 6.298 14.617 6.051 14.095 6.051H13.679C12.836 6.051 12.153 6.734 12.153 7.576V10.322"
        stroke="#69CFC5"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default AddTextIcon;
