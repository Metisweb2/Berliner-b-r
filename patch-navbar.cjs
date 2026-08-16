const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

code = code.replace(
  '<div className="w-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between relative">',
  '<div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 xl:grid-cols-[1fr_auto_1fr] items-center gap-4">'
);

code = code.replace(
  '          {/* LEFT: Logo */}\n          <Link to="/" className="flex items-center gap-3 group z-10">',
  '          {/* LEFT: Logo */}\n          <div className="flex justify-start z-10">\n            <Link to="/" className="flex items-center gap-3 group">'
);
code = code.replace(
  '              Fahrschule Bär\n            </span>\n          </Link>',
  '              Fahrschule Bär\n            </span>\n            </Link>\n          </div>'
);

code = code.replace(
  '          {/* CENTER: Desktop Nav Links */}\n          <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 z-10">',
  '          {/* CENTER: Desktop Nav Links */}\n          <div className="hidden xl:flex justify-center z-10">'
);

code = code.replace(
  '          {/* RIGHT: Buttons */}\n          <div className="hidden xl:flex items-center gap-4 z-10">',
  '          {/* RIGHT: Buttons */}\n          <div className="hidden xl:flex justify-end items-center gap-4 z-10">'
);

code = code.replace(
  '          {/* Mobile Toggle & Language */}\n          <div className="xl:hidden flex items-center gap-4 z-10">',
  '          {/* Mobile Toggle & Language */}\n          <div className="xl:hidden flex justify-end items-center gap-4 z-10">'
);

fs.writeFileSync('src/components/Navbar.tsx', code);
