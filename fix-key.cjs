const fs = require('fs');

let code = fs.readFileSync('src/components/CreatorFeed.tsx', 'utf8');

// Change it to React.FC which automatically supports key
code = code.replace(
  'const VideoCard = ({ video, onClick }: { video: VideoData, onClick: () => void }) => {',
  'const VideoCard: React.FC<{ video: VideoData, onClick: () => void }> = ({ video, onClick }) => {'
);
fs.writeFileSync('src/components/CreatorFeed.tsx', code);
