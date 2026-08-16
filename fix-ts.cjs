const fs = require('fs');

const files = ['src/components/CreatorFeed.tsx', 'src/pages/AdminVideos.tsx'];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  
  if (file.includes('CreatorFeed.tsx')) {
    code = code.replace(
      'interface VideoData {\n  id: string;\n  creatorName: string;\n  description: string;\n  videoUrl: string;\n  thumbnailUrl: string;\n  status: string;\n}',
      'interface VideoData {\n  id: string;\n  creatorName: string;\n  description: string;\n  videoUrl: string;\n  thumbnailUrl: string;\n  status: string;\n  logoUrl?: string;\n  likes?: string;\n  comments?: string;\n  favorites?: string;\n}'
    );
  } else if (file.includes('AdminVideos.tsx')) {
    code = code.replace(
      'interface VideoData {\n  id: string;\n  creatorName: string;\n  description: string;\n  videoUrl: string;\n  thumbnailUrl: string;\n  createdAt: any;\n}',
      'interface VideoData {\n  id: string;\n  creatorName: string;\n  description: string;\n  videoUrl: string;\n  thumbnailUrl: string;\n  createdAt: any;\n  logoUrl?: string;\n  likes?: string;\n  comments?: string;\n  favorites?: string;\n}'
    );
  }
  
  fs.writeFileSync(file, code);
});

console.log('Fixed interfaces');
