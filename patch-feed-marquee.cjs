const fs = require('fs');
let code = fs.readFileSync('src/components/CreatorFeed.tsx', 'utf8');

// 1. Slow down marquee and remove hover pause
code = code.replace('animation: marquee 40s linear infinite;', 'animation: marquee 80s linear infinite;');
code = code.replace('.group:hover .animate-marquee {\n          animation-play-state: paused;\n        }', '');

// 2. Fix the seamless loop gap math
const oldFlexContainer = `<div className="relative w-full overflow-hidden flex group">
          {/* We use two flex containers that each scroll their full width. This creates a perfect loop. */}
          <div className="flex w-max animate-marquee pr-6 md:pr-8 gap-6 md:gap-8 shrink-0">
            {extendedVideos.map((video, idx) => (
              <VideoCard key={video.id + '-' + idx} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
          <div className="flex w-max animate-marquee pr-6 md:pr-8 gap-6 md:gap-8 shrink-0" aria-hidden="true">
            {extendedVideos.map((video, idx) => (
              <VideoCard key={video.id + '-dup-' + idx} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
        </div>`;

const newFlexContainer = `<div className="relative w-full overflow-hidden flex">
          {/* We use two flex containers that each scroll their full width. This creates a perfect loop. */}
          <div className="flex w-max animate-marquee pr-4 md:pr-6 gap-4 md:gap-6 shrink-0">
            {extendedVideos.map((video, idx) => (
              <VideoCard key={video.id + '-' + idx} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
          <div className="flex w-max animate-marquee pr-4 md:pr-6 gap-4 md:gap-6 shrink-0" aria-hidden="true">
            {extendedVideos.map((video, idx) => (
              <VideoCard key={video.id + '-dup-' + idx} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
        </div>`;
code = code.replace(oldFlexContainer, newFlexContainer);

// 3. Make Mobile sizing better 
// from w-[240px] md:w-[280px] to w-[200px] md:w-[280px]
code = code.replace('w-[240px] md:w-[280px]', 'w-[200px] md:w-[280px]');

// 4. Add getTikTokId and conditional TikTok Iframe rendering
const importLine = `import { Play, X, Heart, MessageCircle, Share2, Bookmark, Plus } from 'lucide-react';`;
const newImportLine = `import { Play, X, Heart, MessageCircle, Share2, Bookmark, Plus } from 'lucide-react';

function getTikTokId(url: string) {
  if (!url) return null;
  const match = url.match(/video\\/(\\d+)/);
  return match ? match[1] : null;
}`;
code = code.replace(importLine, newImportLine);

const oldVideoPlayer = `<video
                src={selectedVideo.videoUrl}
                autoPlay
                loop
                controls
                className="w-full h-full object-cover"
              />`;

const newVideoPlayer = `{getTikTokId(selectedVideo.videoUrl) ? (
                <iframe
                  src={\`https://www.tiktok.com/embed/v2/\${getTikTokId(selectedVideo.videoUrl)}\`}
                  className="w-full h-full"
                  allow="fullscreen"
                  style={{ border: 'none' }}
                />
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  autoPlay
                  loop
                  controls
                  className="w-full h-full object-cover"
                />
              )}`;
code = code.replace(oldVideoPlayer, newVideoPlayer);

fs.writeFileSync('src/components/CreatorFeed.tsx', code);
