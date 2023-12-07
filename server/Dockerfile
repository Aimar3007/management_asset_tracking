# Gunakan image node terbaru
FROM node:latest

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Port yang digunakan oleh Express.js (sesuaikan jika perlu)
EXPOSE 3001

# Perintah untuk menjalankan aplikasi Express.js
CMD ["npm", "start"]
