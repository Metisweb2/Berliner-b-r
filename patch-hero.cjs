const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const target = `        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium tracking-widest uppercase backdrop-blur-md">
            Die Fahrschule der neuen Generation
          </span>
        </motion.div>`;

code = code.replace(target, '');
fs.writeFileSync('src/components/Hero.tsx', code);
