# ใช้ Node แบบ Debian/Bullseye
FROM node:20-bullseye

WORKDIR /usr/src/app

# ติดตั้ง dependencies ที่จำเป็นบน Debian
RUN apt-get update && apt-get install -y openssl curl bash && rm -rf /var/lib/apt/lists/*

# copy package.json ก่อนเพื่อลด rebuild
COPY package*.json ./

# install dependencies
RUN npm install

# copy code ทั้งหมด
COPY . .

# expose port
EXPOSE 3000

# run dev
CMD ["npm", "run", "dev"]
