# Gunakan image node terbaru
FROM node:latest

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install --prefer-offline --no-audit

# Salin semua file ke dalam container
COPY . .

# Build proyek React
RUN npm run build

# Port yang digunakan oleh React (sesuaikan jika perlu)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi React
CMD ["npm", "start"]
