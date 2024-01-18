# Gunakan image node versi LTS sebagai base image
FROM node:lts

# Set working directory di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada) ke dalam direktori kerja
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Salin semua file dari direktori saat ini ke dalam direktori kerja di dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Port yang akan diexpose oleh container
EXPOSE 3000

# Perintah untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "start"]
