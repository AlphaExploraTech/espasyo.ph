const fs = require('fs');

const cloudinaryUrl = 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/';

function processFile(filePath, replacements) {
    if(!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
}

// 1. Services360.tsx
processFile('D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Home\\Services360.tsx', [
    [/\/assets\//g, cloudinaryUrl],
    [/https:\/\/res\.cloudinary\.com\/dlk93aehl\/image\/upload\/360\/Nav8-1\.png/g, '/assets/360/Nav8-1.png'],
    [/https:\/\/res\.cloudinary\.com\/dlk93aehl\/image\/upload\/landing\//g, '/assets/landing/'] // Safety check, though not in this file
]);

// 2. homeData.ts
processFile('D:\\Work\\Catubs\\espasyo.ph\\src\\constants\\homeData.ts', [
    [/\/assets\//g, cloudinaryUrl]
]);

// 3. testimonials.json
processFile('D:\\Work\\Catubs\\espasyo.ph\\src\\data\\testimonials.json', [
    [/public\/assets\//g, cloudinaryUrl],
    [/\/assets\//g, cloudinaryUrl]
]);

// 4. Testimonials.tsx
// Need to replace the import of LOGO with a const.
processFile('D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Testimonials.tsx', [
    [/import LOGO from '\.\.\/assets\/LOGO\.png';/g, `const LOGO = "${cloudinaryUrl}LOGO.png";`]
]);

// 5. Footer.tsx
// Replace the image imports with consts.
processFile('D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Common\\Footer.tsx', [
    [/import (\w+) from '\.\.\/\.\.\/assets\/footer-img\/([^']+)\.png';/g, `const $1 = "${cloudinaryUrl}footer-img/$2.png";`]
]);
