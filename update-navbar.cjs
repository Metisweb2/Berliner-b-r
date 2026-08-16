const fs = require('fs');

let navbarCode = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// 1. Remove faq
navbarCode = navbarCode.replace(/  \{ key: 'faq', href: '\/faq' \},\n/, '');

// 2. Add hoveredPath state
navbarCode = navbarCode.replace(
  "const { t } = useTranslation();",
  "const { t } = useTranslation();\n  const [hoveredPath, setHoveredPath] = useState<string | null>(null);"
);

// 3. Update the Desktop Nav mapping to use motion layout
const oldNav = `<div className="flex gap-6">
              {navLinksData.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-sm font-medium text-neutral-300 hover:text-white transition-colors hover:text-shadow-gold"
                >
                  {t(\`nav.\${link.key}\`)}
                </Link>
              ))}
            </div>`;

const newNav = `<div 
              className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-md"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinksData.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  onMouseEnter={() => setHoveredPath(link.key)}
                  className={\`relative px-4 py-2 text-sm font-medium transition-colors z-10 \${hoveredPath === link.key ? 'text-white' : 'text-neutral-400'}\`}
                >
                  {hoveredPath === link.key && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {t(\`nav.\${link.key}\`)}
                </Link>
              ))}
            </div>`;

navbarCode = navbarCode.replace(oldNav, newNav);

fs.writeFileSync('src/components/Navbar.tsx', navbarCode);
