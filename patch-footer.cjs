const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Replace md:col-span-4 to md:col-span-5
code = code.replace('className="md:col-span-4 flex flex-col"', 'className="md:col-span-5 flex flex-col"');

// Replace Legal col-span from 2 to 3
code = code.replace('{/* Column 4: Legal (Impressum, Datenschutz, AGB) */}          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">', '{/* Column 4: Legal (Impressum, Datenschutz, AGB) */}          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3">');

// Remove Column 5: Creators
const col5 = `          {/* Column 5: Creators */}          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-xs">Creators</h4>            <ul className="space-y-3">              <li>                <Link to="/creator-upload" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">Upload</Link>              </li>              <li>                <Link to="/admin-videos" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">Admin</Link>              </li>            </ul>          </motion.div>`;
code = code.replace(col5, '');

fs.writeFileSync('src/components/Footer.tsx', code);
