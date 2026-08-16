const fs = require('fs');

let code = fs.readFileSync('src/components/CreatorFeed.tsx', 'utf-8');

// Change the slogan
code = code.replace(
  'Also, wann kommst du?',
  'Werde Teil unserer Community!'
);

// Remove the TikTok link paragraph entirely
code = code.replace(
  /<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white\/90">[\s\S]*?<\/div>/,
  ''
);

// Update metrics and logo to use video data
code = code.replace(
  /<img src={video\.thumbnailUrl} alt="" className="w-full h-full rounded-full object-cover" \/>/,
  '<img src={video.logoUrl || video.thumbnailUrl} alt="" className="w-full h-full rounded-full object-cover" />'
);

code = code.replace(
  /<span className="text-\[11px\] font-bold">8\.4k<\/span>/,
  '<span className="text-[11px] font-bold">{video.likes || \'8.4k\'}</span>'
);

code = code.replace(
  /<span className="text-\[11px\] font-bold">145<\/span>/,
  '<span className="text-[11px] font-bold">{video.comments || \'145\'}</span>'
);

code = code.replace(
  /<span className="text-\[11px\] font-bold">312<\/span>/,
  '<span className="text-[11px] font-bold">{video.favorites || \'312\'}</span>'
);

fs.writeFileSync('src/components/CreatorFeed.tsx', code);
console.log('CreatorFeed patched');
