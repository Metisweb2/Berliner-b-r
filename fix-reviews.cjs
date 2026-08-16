const fs = require('fs');
let code = fs.readFileSync('src/components/GoogleReviews.tsx', 'utf-8');

code = code.replace(/const ref = useRef\(null\);\s*const inView = useInView\(ref, \{ once: true, margin: '-50px' \}\);\s*/, '');
code = code.replace(/ref=\{ref\}\s*initial/g, 'initial');
code = code.replace(/animate=\{inView \? \{ opacity: 1, y: 0 \} : \{\}\}/g, 'whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true, margin: "-50px" }}');

// Remove import { Star } from 'lucide-react'; if useInView is unused? Wait, useInView is from motion/react.
code = code.replace(/useInView,? ?/, '');

fs.writeFileSync('src/components/GoogleReviews.tsx', code);
