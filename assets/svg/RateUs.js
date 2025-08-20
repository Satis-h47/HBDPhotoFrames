import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const RateUs = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    {/* Star outline */}
    <Path
      d="M11.478 2L15.138 8.261L22 9.808L17.4 15.225L18.118 22.442L11.478 19.529L4.837 22.442L5.556 15.225L1 9.808L7.818 8.261L11.478 2Z"
      stroke="#EB5F83"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Left eye */}
    <Circle cx={9.701} cy={10.632} r={0.89} fill="#EB5F83" />

    {/* Right eye */}
    <Circle cx={13.265} cy={15.97} r={0.89} fill="#EB5F83" />

    {/* Smile (angled line) */}
    <Path
      d="M13.261 11.521L9.703 15.08"
      stroke="#EB5F83"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export default RateUs;
