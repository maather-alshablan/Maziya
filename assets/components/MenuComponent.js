/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";
import Svg, { Path } from "react-native-svg";

const MenuComponent = ({ svgRef, ...props }) => (
  <Svg
    {...props}
    width={23.815}
    height={23.226}
    viewBox="0 0 23.815 23.226"
    ref={svgRef}
  >
    <Path
      d="M25.624,20.772H4.191C3.476,20.772,3,20.108,3,19.113s.476-1.659,1.191-1.659H25.624c.714,0,1.191.664,1.191,1.659S26.339,20.772,25.624,20.772Zm0-9.954H4.191C3.476,10.818,3,10.154,3,9.159S3.476,7.5,4.191,7.5H25.624c.714,0,1.191.664,1.191,1.659S26.339,10.818,25.624,10.818Zm0,19.908H4.191C3.476,30.726,3,30.062,3,29.067s.476-1.659,1.191-1.659H25.624c.714,0,1.191.664,1.191,1.659S26.339,30.726,25.624,30.726Z"
      transform="translate(-3 -7.5)"
    />
  </Svg>
);

const ForwardRef = React.forwardRef((props, ref) => (
  <MenuComponent svgRef={ref} {...props} />
));
export default ForwardRef;
