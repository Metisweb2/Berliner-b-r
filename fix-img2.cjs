const fs = require('fs');

const files = ['src/components/Fleet.tsx', 'src/components/FleetManager.tsx', 'src/components/About.tsx', 'src/components/AboutTeamManager.tsx', 'src/pages/AdminVideos.tsx', 'src/components/CreatorFeed.tsx'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let code = fs.readFileSync(f, 'utf-8');
    
    // Replace <img ... /> or <img ...> with referrerPolicy="no-referrer"
    // To be safe, we just look for `src={` or `src="` inside img tags and add it there if not already present.
    
    // Find all <img ...> and <motion.img ...>
    // We can just add referrerPolicy="no-referrer" right after the `src=` attribute.
    code = code.replace(/(<img[\s\S]*?src=[^\s>]+)/g, (match) => {
      if (match.includes('referrerPolicy')) return match;
      return match + ' referrerPolicy="no-referrer"';
    });

    code = code.replace(/(<motion\.img[\s\S]*?src=[^\s>]+)/g, (match) => {
      if (match.includes('referrerPolicy')) return match;
      return match + ' referrerPolicy="no-referrer"';
    });

    fs.writeFileSync(f, code);
  }
});
console.log('Fixed referrerPolicy again');
