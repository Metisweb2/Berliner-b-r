const fs = require('fs');

const files = ['src/components/Fleet.tsx', 'src/components/FleetManager.tsx', 'src/components/About.tsx', 'src/components/AboutTeamManager.tsx', 'src/pages/AdminVideos.tsx', 'src/components/CreatorFeed.tsx'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let code = fs.readFileSync(f, 'utf-8');
    
    // For standard img
    code = code.replace(/<img([^>]+)>/g, (match, p1) => {
      if (p1.includes('referrerPolicy')) return match;
      return `<img${p1} referrerPolicy="no-referrer">`;
    });
    
    // For motion.img
    code = code.replace(/<motion\.img([^>]+)\/>/g, (match, p1) => {
      if (p1.includes('referrerPolicy')) return match;
      return `<motion.img${p1} referrerPolicy="no-referrer"/>`;
    });

    fs.writeFileSync(f, code);
  }
});
console.log('Fixed referrerPolicy');
