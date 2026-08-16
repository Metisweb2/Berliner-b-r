const fs = require('fs');
let code = fs.readFileSync('src/components/GoogleReviews.tsx', 'utf-8');

// Remove backdrop-blur and 3D preserves which cause artifacts on borders
code = code.replace(
  'transformStyle: "preserve-3d"',
  ''
);

code = code.replace(
  'backdrop-blur-3xl',
  'bg-white/[0.04]'
);

code = code.replace(
  'style={{ transform: "translateZ(30px)" }}',
  ''
);

code = code.replace(
  'style={{ transform: "translateZ(20px)" }}',
  ''
);

// We can just keep rotateX and rotateY, but remove preserve-3d
// Also change the background so it's opaque enough not to need heavy backdrop filter 
// which glitches out on intersections.

fs.writeFileSync('src/components/GoogleReviews.tsx', code);
console.log('Fixed GoogleReviews artifact issues');
