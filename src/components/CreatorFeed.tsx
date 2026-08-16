import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Play, X, Heart, MessageCircle, Share2, Bookmark, Plus } from 'lucide-react';

function getTikTokId(url: string) {
  if (!url) return null;
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

interface VideoData {
  id: string;
  creatorName: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  status: string;
  logoUrl?: string;
  likes?: string;
  comments?: string;
  favorites?: string;
}

export function CreatorFeed() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const q = query(
          collection(db, 'videos'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VideoData));
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    }
    fetchVideos();
  }, []);

  // We duplicate the videos multiple times so the infinite scroll doesn't run out of content on wide screens
  // Minimum duplicates to guarantee it's long enough:
  const extendedVideos = [...videos, ...videos, ...videos, ...videos];

  return (
    <section className="bg-dark-bg border-t border-white/5 py-24 relative overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
        
      `}</style>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider mb-4">
          Werde Teil unserer Community!
        </h2>
        
      </div>

      {videos.length === 0 ? (
        <div className="text-center text-white/60 py-20">Noch keine Videos vorhanden.</div>
      ) : (
        <div className="relative w-full overflow-hidden flex">
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
        </div>
      )}

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              {getTikTokId(selectedVideo.videoUrl) ? (
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${getTikTokId(selectedVideo.videoUrl)}`}
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
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="text-white font-bold text-lg mb-2">@{selectedVideo.creatorName}</h3>
                <p className="text-white/80 text-sm">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const VideoCard: React.FC<{ video: VideoData, onClick: () => void }> = ({ video, onClick }) => {
  return (
    <div
      className="relative flex-none w-[200px] md:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl bg-neutral-900 transition-transform duration-500 hover:scale-[1.02]"
      onClick={onClick}
    >
      <img referrerPolicy="no-referrer" 
        src={video.thumbnailUrl} 
        alt={video.description} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Dark gradient from bottom like TikTok */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none z-10" />
      
      {/* Play Button Overlay (Hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Bottom Left Info */}
      <div className="absolute bottom-4 left-4 right-16 text-white z-30 flex flex-col justify-end">
        <p className="text-sm font-bold mb-1 line-clamp-1">@{video.creatorName}</p>
        <p className="text-[12px] font-medium text-white/90 line-clamp-2 leading-tight">{video.description}</p>
        
        {/* Fake sound marquee */}
        <div className="flex items-center gap-2 mt-3 overflow-hidden">
          <div className="w-3 h-3 text-white">🎵</div>
          <p className="text-[10px] whitespace-nowrap animate-[marquee_4s_linear_infinite]">Originalton - {video.creatorName}</p>
        </div>
      </div>
      
      {/* Right Column Icons (TikTok Style) */}
      <div className="absolute right-3 bottom-6 flex flex-col items-center gap-5 text-white z-30">
        {/* Profile Pic with Plus */}
        <div className="relative mb-2">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-white/20 border-2 border-white p-[1px]">
            <img referrerPolicy="no-referrer" src={video.logoUrl || video.thumbnailUrl} alt="" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary rounded-full p-0.5">
            <Plus className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 group/icon">
          <Heart className="w-7 h-7 text-white transition-transform group-hover/icon:scale-110" />
          <span className="text-[11px] font-bold">{video.likes || '8.4k'}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group/icon">
          <MessageCircle className="w-7 h-7 text-white transition-transform group-hover/icon:scale-110" />
          <span className="text-[11px] font-bold">{video.comments || '145'}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group/icon">
          <Bookmark className="w-7 h-7 text-white transition-transform group-hover/icon:scale-110" />
          <span className="text-[11px] font-bold">{video.favorites || '312'}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group/icon">
          <Share2 className="w-7 h-7 text-white transition-transform group-hover/icon:scale-110" />
          <span className="text-[11px] font-bold">Teilen</span>
        </div>
      </div>
    </div>
  );
}
