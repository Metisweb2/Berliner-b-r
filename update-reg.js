const fs = require('fs');

let code = fs.readFileSync('src/components/Registration.tsx', 'utf-8');

// We want to add Phone and Mail icons.
if (!code.includes('Phone,')) {
  code = code.replace(/import \{([^}]+)\} from 'lucide-react';/, "import { $1, Phone, Mail } from 'lucide-react';");
}

const contactInfoBlock = `
          <div className="mt-12 p-6 bg-dark-card border border-white/5 rounded-2xl">
            <h4 className="font-bold text-white mb-4">Direkter Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-medium text-white">Telefon Büro</div>
                  <a href="tel:03068073651" className="text-neutral-400 hover:text-white transition-colors block">030 – 680 736 51</a>
                  <a href="tel:017660807518" className="text-neutral-400 hover:text-white transition-colors block mt-1">0176 – 608 075 18</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-medium text-white">E-Mail</div>
                  <a href="mailto:BerlinerBaerGmbH@gmail.com" className="text-neutral-400 hover:text-white transition-colors">BerlinerBaerGmbH@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
`;

// Insert the contactInfoBlock after the steps block
code = code.replace(
  /(<p className="text-sm text-neutral-400">\{t\('reg\.steps\.3\.desc'\)\}<\/p>\s*<\/div>\s*<\/div>\s*<\/div>)/,
  "$1\n" + contactInfoBlock
);

fs.writeFileSync('src/components/Registration.tsx', code);
