# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Khai báo các biến ARG để nhận từ Docker Compose
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_BACKEND_AUTH
ARG NEXT_PUBLIC_BACKEND_USER
ARG NEXT_PUBLIC_FRONTEND_URL
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# Chuyển đổi thành ENV để Next.js build-time sử dụng
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_AUTH=$NEXT_PUBLIC_BACKEND_AUTH
ENV NEXT_PUBLIC_BACKEND_USER=$NEXT_PUBLIC_BACKEND_USER
ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

COPY package*.json ./
RUN npm install
COPY . .
# Biến môi trường sẽ được nhúng vào code tại bước build này
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001
CMD ["npm", "run", "start", "--", "-p", "3001"]