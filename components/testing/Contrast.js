// // import React from 'react';
// // import { Image } from 'react-native';
// // import {
// //   ColorMatrix,
// //   concatColorMatrices,
// //   contrast,
// //   invert,
// //   saturate,
// // } from 'react-native-color-matrix-image-filters';

// // export default function Contrast() {
// //   return (
// //     <ColorMatrix
// //       matrix={concatColorMatrices([
// //         saturate(-0.9),    // Desaturate (close to grayscale)
// //         contrast(5.2),     // Increase contrast
// //         invert(),          // Invert colors
// //       ])}
// //     >
// //       <Image
// //         style={{ width: 100, height: 100 }}
// //         source={{
// //           uri: 'https://st.depositphotos.com/1003580/2282/i/950/depositphotos_22823278-stock-photo-closeup-portrait-of-real-child.jpg',
// //         }}
// //       />
// //     </ColorMatrix>
// //   );
// // }

// import { Image } from 'react-native'
// import {
//   SoftLightBlend,
//   Emboss,
//   Earlybird,
//   Invert,
//   RadialGradient
// } from 'react-native-image-filter-kit'

// export default function Contrast(){
// return (
//   <Earlybird
//     image={
//       <SoftLightBlend
//         resizeCanvasTo={'dstImage'}
//         dstTransform={{
//           scale: 'CONTAIN'
//         }}
//         dstImage={
//           <Emboss
//             image={
//               <Image
//                 style={{ width: 320, height: 320 }}
//                 source={{uri:'https://raw.githubusercontent.com/iyegoroff/react-native-image-filter-kit/master/img/parrot.png'}}
//                 resizeMode={'contain'}
//               />
//             }
//           />
//         }
//         srcTransform={{
//           anchor: { x: 0.5, y: 1 },
//           translate: { x: 0.5, y: 1 }
//         }}
//         srcImage={
//           <Invert
//             image={
//               <RadialGradient
//                 colors={['rgba(0, 0, 255, 1)', '#00ff00', 'red']}
//                 stops={[0.25, 0.75, 1]}
//                 center={{ x: '50w', y: '100h' }}
//               />
//             }
//           />
//         }
//       />
//     }
//   />
// )
// }