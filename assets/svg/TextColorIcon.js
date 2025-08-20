import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TextColorIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {/* Main tooth/face shape */}
      <Path
        d="M18.918 15.442C18.502 14.788 17.797 14.314 16.92 14.265C14.964 14.155 13.378 13.41 12.588 12.041C11.797 10.673 11.946 8.927 12.828 7.178C13.719 5.411 12.311 3.32 10.338 3.477C8.982 3.585 7.629 3.989 6.373 4.714C1.851 7.325 0.302 13.106 2.913 17.627C5.523 22.149 11.304 23.698 15.826 21.087C17.082 20.362 18.108 19.392 18.88 18.272C18.893 18.253 18.905 18.233 18.918 18.214"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Vertical tool/syringe bar */}
      <Path
        d="M21.496 8.185V21.066C21.496 21.778 20.919 22.355 20.207 22.355C19.495 22.355 18.918 21.778 18.918 21.066V8.185H21.496Z"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Small tooth (right) */}
      <Path
        d="M12.774 18.385C13.13 19.001 13.919 19.212 14.535 18.856C15.152 18.5 15.363 17.712 15.007 17.096C14.651 16.479 13.863 16.268 13.246 16.624C12.63 16.98 12.418 17.768 12.774 18.385Z"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Small tooth (left) */}
      <Path
        d="M7.189 17.096C6.833 17.712 7.044 18.5 7.66 18.856C8.277 19.212 9.065 19.001 9.421 18.385C9.777 17.768 9.566 16.98 8.949 16.624C8.333 16.268 7.544 16.479 7.189 17.096Z"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Circle (cheek/dot) */}
      <Path
        d="M5.512 11.613C4.8 11.613 4.223 12.19 4.223 12.902C4.223 13.614 4.8 14.191 5.512 14.191C6.224 14.191 6.801 13.614 6.801 12.902C6.801 12.19 6.224 11.613 5.512 11.613Z"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Small tooth (top left) */}
      <Path
        d="M9.421 7.42C9.065 6.803 8.277 6.592 7.66 6.948C7.044 7.304 6.833 8.092 7.189 8.709C7.544 9.325 8.333 9.537 8.949 9.181C9.566 8.825 9.777 8.036 9.421 7.42Z"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Water droplet or heart shape (top right) */}
      <Path
        d="M20.207 1.644C20.207 1.644 18.059 3.439 18.059 6.371C18.059 7.286 18.396 7.87 18.918 8.195V8.185H21.496V8.195C22.018 7.87 22.355 7.286 22.355 6.371C22.355 3.439 20.207 1.644 20.207 1.644Z"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Horizontal line */}
      <Path
        d="M18.918 17.199H21.496"
        stroke="#256F9A"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export default TextColorIcon;
