import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      boxGeometry: any;
      color: any;
      directionalLight: any;
      fog: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      planeGeometry: any;
      torusGeometry: any;
    }
  }
}

export {};
