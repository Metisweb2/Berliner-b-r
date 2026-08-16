const fs = require('fs');

const file = 'src/components/Fleet.tsx';
let code = fs.readFileSync(file, 'utf-8');

// The messed up tag looks like this:
// src={car.img} referrerPolicy="no-referrer" 
// alt={car.name} 
// className="..."
// referrerPolicy="no-referrer"/>

code = code.replace(/referrerPolicy="no-referrer"/g, '');
code = code.replace(/<motion\.img/g, '<motion.img referrerPolicy="no-referrer"');

fs.writeFileSync(file, code);
console.log('Cleaned up Fleet.tsx');
