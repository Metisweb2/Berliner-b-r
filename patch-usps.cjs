const fs = require('fs');
let code = fs.readFileSync('src/components/USPs.tsx', 'utf8');

const targetAnimation = `                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1, 
                  type: "spring", 
                  stiffness: 90, 
                  damping: 20 
                }}`;

const newAnimation = `                initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  mass: 1
                }}`;

code = code.replace(targetAnimation, newAnimation);

// Wrap map items in a perspective container for 3D effect
const gridTarget = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">`;
const newGrid = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "1000px" }}>`;

code = code.replace(gridTarget, newGrid);

fs.writeFileSync('src/components/USPs.tsx', code);
