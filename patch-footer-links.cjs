const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const newColumn = `          {/* Column 5: Creators */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-xs">Creators</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/creator-upload" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">Upload</Link>
              </li>
              <li>
                <Link to="/admin-videos" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">Admin</Link>
              </li>
            </ul>
          </motion.div>
`;

code = code.replace(
  '{/* Column 4: Legal (Impressum, Datenschutz, AGB) */}',
  newColumn + '\n          {/* Column 4: Legal (Impressum, Datenschutz, AGB) */}'
);

// We need to adjust grid columns so it fits.
code = code.replace(
  'className="md:col-span-3 lg:col-span-3"',
  'className="md:col-span-2 lg:col-span-2"'
);
code = code.replace(
  'className="md:col-span-5 flex flex-col"',
  'className="md:col-span-4 flex flex-col"'
);

fs.writeFileSync('src/components/Footer.tsx', code);
