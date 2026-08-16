const fs = require('fs');

let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace the <motion.nav> return block up to the {/* Mobile Menu */}
const oldNavBlockRegex = /<motion\.nav[\s\S]*?<\/motion\.nav>/;

const newNavBlock = `<motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-300 \${
          isScrolled
            ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/5 py-2.5'
            : 'bg-transparent py-4'
        }\`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <BearLogo className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg xl:text-xl font-bold tracking-wider uppercase text-white hidden sm:block whitespace-nowrap">
              Fahrschule Bär
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-4 xl:gap-8">
            <div 
              className="flex items-center bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinksData.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  onMouseEnter={() => setHoveredPath(link.key)}
                  className={\`relative px-3 xl:px-4 py-1.5 text-[13px] xl:text-sm font-medium whitespace-nowrap transition-colors z-10 \${hoveredPath === link.key ? 'text-white' : 'text-neutral-400'}\`}
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
            </div>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-4">
              <LanguageSwitcher />
              
              <Link
                to="/#register"
                className="px-5 xl:px-6 py-2 rounded-full bg-gradient-to-r from-primary to-red-500 text-white font-medium text-[13px] xl:text-sm whitespace-nowrap transition-all hover:shadow-[0_0_20px_rgba(217,4,41,0.4)] hover:scale-105 border border-red-400/20 relative overflow-hidden group"
              >
                <span className="relative z-10">{t('nav.register')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Link>
            </div>
          </div>
          
          {/* Mobile Toggle & Language */}
          <div className="xl:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>`;

code = code.replace(oldNavBlockRegex, newNavBlock);

fs.writeFileSync('src/components/Navbar.tsx', code);
