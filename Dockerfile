# Sử dụng Node.js LTS làm base image
FROM node:20-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép các file cần thiết
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Generate NEXTAUTH_SECRET trong file .env.local
RUN cp .env.example.txt .env.local && \
    sed -i "s|NEXTAUTH_SECRET=|NEXTAUTH_SECRET=$(openssl rand -base64 32)|" .env.local

# Expose cổng mà Next.js sẽ chạy
EXPOSE 3000

# Lệnh mặc định để chạy ứng dụng
CMD ["npm", "run", "dev"]
