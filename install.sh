pkg update && pkg upgrade
pkg install git -y
pkg install nodejs -y
pkg install ffmpeg -y
pkg install imagemagick -y
pkg install yarn
git clone https://github.com/ArdyBotzz/Fazd-Md
cd Fazd-Md
yarn
node index.js
