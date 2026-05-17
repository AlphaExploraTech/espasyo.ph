// src/constants/galleryData.ts

// 1. Cloudinary Base URL mo
const baseUrl = "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/";


const totalPictures = 80;


const cloudinaryImages = Array.from({ length: totalPictures }, (_, i) =>
  `${baseUrl}g${i + 1}.jpg`
);

const fallbackImages = [
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774459535/g30.jpg'
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Ginagamit ang Cloudinary images, tapos isha-shuffle para iba-iba ang pwesto kada load
export const imagePool = cloudinaryImages.length > 0 ? shuffleArray(cloudinaryImages) : fallbackImages;

// --- GRID CONFIGURATION ---
export const ROWS = 9;
export const COLS = 12;
export const TOTAL_ITEMS = ROWS * COLS; // 108

// Mapunta sa grid yung mga pictures
export const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  src: imagePool[i % imagePool.length]
}));