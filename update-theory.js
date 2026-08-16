const fs = require('fs');
let content = fs.readFileSync('src/components/TheorySchedule.tsx', 'utf-8');

// Remove Lucide imports
content = content.replace("import { CalendarDays, BookOpen, Clock, Sparkles } from 'lucide-react';", "");

// Replace header section
const oldHeaderRegex = /<motion\.div[\s\S]*?<BookOpen[\s\S]*?<\/motion\.div>/;
const newHeader = `<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent mb-4" />
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Fahrplan</span>
          </motion.div>`;
content = content.replace(oldHeaderRegex, newHeader);

// Replace table headers
content = content.replace(/<CalendarDays[\s\S]*?<\/span>/, `<span className="font-bold text-white tracking-widest uppercase text-xs md:text-sm">{t('theory.weekday')}</span>`);
content = content.replace(/\{t\('theory\.lang_ru', 'Russisch'\)\} <Sparkles[\s\S]*?<\/span>/, `{t('theory.lang_ru', 'Russisch')}</span>`);
content = content.replace(/\{t\('theory\.lang_de', 'Deutsch'\)\} <Sparkles[\s\S]*?<\/span>/, `{t('theory.lang_de', 'Deutsch')}</span>`);

// Replace clocks in the body
content = content.replace(/<Clock className="w-4 h-4 hidden sm:block" \/>/g, '');

fs.writeFileSync('src/components/TheorySchedule.tsx', content);
