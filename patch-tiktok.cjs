const fs = require('fs');

const pathTikTokSolid = "M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.8 4.54-2.19 6.28-1.57 1.95-3.8 3.19-6.22 3.53-2.67.37-5.46-.22-7.58-1.93-1.92-1.55-3.14-3.86-3.41-6.3-.32-2.88.58-5.86 2.39-8.06 1.83-2.22 4.67-3.41 7.55-3.32v4.02c-1.85-.05-3.77.49-5.11 1.73-1.37 1.28-2.12 3.17-2.07 5.09.05 1.98.92 3.9 2.45 5.06 1.57 1.18 3.73 1.52 5.64.91 1.83-.58 3.26-1.99 3.86-3.81.33-1.01.46-2.1.41-3.16-.07-5.84-.04-11.68-.04-17.52H12.525z";

const newTikTokIcon = `const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 28 28" 
    fill="currentColor" 
    className={className}
  >
    <path d="M14.525 2.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.8 4.54-2.19 6.28-1.57 1.95-3.8 3.19-6.22 3.53-2.67.37-5.46-.22-7.58-1.93-1.92-1.55-3.14-3.86-3.41-6.3-.32-2.88.58-5.86 2.39-8.06 1.83-2.22 4.67-3.41 7.55-3.32v4.02c-1.85-.05-3.77.49-5.11 1.73-1.37 1.28-2.12 3.17-2.07 5.09.05 1.98.92 3.9 2.45 5.06 1.57 1.18 3.73 1.52 5.64.91 1.83-.58 3.26-1.99 3.86-3.81.33-1.01.46-2.1.41-3.16-.07-5.84-.04-11.68-.04-17.52H14.525z" />
  </svg>
);`;

// Wait, I just shifted X by 2 and Y by 2 manually in the path string for M14.525 2.02, but I can't easily do that for the rest of the path because there are relative and absolute coordinates.

// The best way is to wrap in a <g> tag:
const correctIcon = `const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <g transform="translate(3, 2) scale(0.8)">
      <path d="${pathTikTokSolid}" />
    </g>
  </svg>
);`;

let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const regex = /const TikTokIcon = \(\{ className \}: \{ className\?: string \}\) => \([\s\S]*?<\/svg>\n\);/;
code = code.replace(regex, correctIcon);

fs.writeFileSync('src/components/Footer.tsx', code);
