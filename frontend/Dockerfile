# ✅ 1. Pakai Node versi 18 agar cocok sama dependency
FROM node:18-alpine

# Set working directory
WORKDIR /app

# ✅ 2. Copy package files & install dependencies pakai root dulu
COPY package*.json ./
RUN npm install

# ✅ 3. Copy seluruh source code
COPY . .

# ✅ 4. Create user and group first
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Create dist directory with proper permissions
RUN mkdir -p /app/dist && chown nextjs:nodejs /app/dist

# Switch to nextjs user
USER nextjs

# Build app
RUN npm run build

# Switch back to root to change ownership
USER root

# ✅ 5. Tambah user non-root untuk runtime (lebih aman)
RUN chown -R nextjs:nodejs /app

USER nextjs

# ✅ 6. Expose port
EXPOSE 3000

# ✅ 7. Jalankan app
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
