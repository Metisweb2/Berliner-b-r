const fs = require('fs');
let code = fs.readFileSync('src/components/CreatorFeed.tsx', 'utf8');

code = code.replace(
  'bg-[#9E3E3E]',
  'bg-[#A83B3B]'
);

code = code.replace(
  '<Play className="w-8 h-8 text-white ml-1" fill="currentColor" />',
  '<Play className="w-8 h-8 text-white ml-1" fill="currentColor" />'
);

const oldCardBottom = `
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-semibold line-clamp-1 mb-1">@{video.creatorName}</p>
                  <p className="text-xs text-white/80 line-clamp-2">{video.description}</p>
                </div>
`;

const newCardBottom = `
                <div className="absolute bottom-4 left-4 right-12 text-white z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-800 border border-white/20">
                      <img src="/placeholder-user.jpg" alt="" className="w-full h-full object-cover opacity-0" />
                    </div>
                    <p className="text-xs font-bold line-clamp-1">{video.creatorName}</p>
                  </div>
                  <p className="text-[11px] font-medium text-white/90 line-clamp-2">{video.description}</p>
                </div>
                
                <div className="absolute right-3 bottom-6 flex flex-col items-center gap-4 text-white z-20">
                  <div className="flex flex-col items-center gap-1">
                    <Heart className="w-6 h-6" />
                    <span className="text-[10px] font-bold">1.2k</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-[10px] font-bold">48</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MoreVertical className="w-6 h-6" />
                  </div>
                </div>
`;

code = code.replace(oldCardBottom, newCardBottom);

// Add the icons over gradient
code = code.replace(
  '<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />',
  '<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10" />'
);

fs.writeFileSync('src/components/CreatorFeed.tsx', code);
