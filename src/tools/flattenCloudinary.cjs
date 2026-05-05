const fs = require('fs');

function flattenCloudinaryPaths(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex matches Cloudinary URLs and strips everything between upload/ and the filename
    // e.g. upload/polaroids/team.jpg -> upload/team.jpg
    const regex = /(https:\/\/res\.cloudinary\.com\/dlk93aehl\/(?:image|video)\/upload\/)(?:[^"'\s]*\/)?([^/"'\s]+\.[a-zA-Z0-9]+)/g;
    
    // Exception check: do not touch URLs if they are already flattened (regex might overmatch if not careful,
    // but the capturing group handles the rightmost filename correctly because [^/"'\s]+ stops at slashes.
    // Wait, (?:[^"'\s]*\/)? is greedy and matches all folders up to the last slash. 
    // Then ([^/"'\s]+\.[a-zA-Z0-9]+) matches the filename.
    
    let updatedContent = content.replace(regex, "$1$2");

    // Also replace the LogoWhite.jpg fallback from '/LogoWhite.jpg' to the Cloudinary URL in DetailModal.tsx
    if (filePath.includes('DetailModal.tsx')) {
        updatedContent = updatedContent.replace(/['"]\/LogoWhite\.jpg['"]/g, "'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/LogoWhite.jpg'");
    }

    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated flattened URLs in ${filePath}`);
    }
}

const files = [
    'D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Home\\Services360.tsx',
    'D:\\Work\\Catubs\\espasyo.ph\\src\\constants\\homeData.ts',
    'D:\\Work\\Catubs\\espasyo.ph\\src\\data\\testimonials.json',
    'D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Testimonials.tsx',
    'D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Common\\Footer.tsx',
    'D:\\Work\\Catubs\\espasyo.ph\\src\\components\\Shared\\Modals\\DetailModal.tsx'
];

files.forEach(flattenCloudinaryPaths);
