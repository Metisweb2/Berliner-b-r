const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove CreatorUpload import
code = code.replace("const CreatorUpload = lazy(() => import('./pages/CreatorUpload').then(m => ({ default: m.CreatorUpload })));", "");

// Replace route and remove CreatorUpload route
code = code.replace('<Route path="/creator-upload" element={<CreatorUpload />} />\\n                <Route path="/admin-videos" element={<AdminVideos />} />', '<Route path="/admin" element={<AdminVideos />} />');

fs.writeFileSync('src/App.tsx', code);
