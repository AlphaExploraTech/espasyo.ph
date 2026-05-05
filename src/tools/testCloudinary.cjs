const https = require('https');
const urls = [
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/polaroids/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1/polaroids/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1/team.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/360/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1/360/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1/Nav3.jpg',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/footer-img/BIR.png',
  'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/BIR.png'
];
urls.forEach(url => {
  https.get(url, (res) => {
    console.log(res.statusCode + ' - ' + url);
  });
});
