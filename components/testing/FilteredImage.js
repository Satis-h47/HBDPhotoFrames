import { Surface } from "gl-react-native";
import { Node, Shaders, GLSL } from "gl-react";
import React from "react";
import { Image } from "react-native";

const shaders = Shaders.create({
  brightnessContrast: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform sampler2D image;
    uniform float brightness;
    uniform float contrast;

    void main () {
      vec4 color = texture2D(image, uv);
      color.rgb += brightness;
      if (contrast > 0.0) {
        color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5;
      } else {
        color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5;
      }
      gl_FragColor = color;
    }
    `
  }
});

const BrightnessContrast = ({ children: image, brightness, contrast }) => (
  <Node
    shader={shaders.brightnessContrast}
    uniforms={{ image, brightness, contrast }}
  />
);

const FilteredImage = ({ uri, brightness, contrast }) => (
  <Surface style={{ width: 300, height: 300 }}>
    <BrightnessContrast brightness={brightness} contrast={contrast}>
      {{ uri }}
    </BrightnessContrast>
  </Surface>
);

export default FilteredImage;
