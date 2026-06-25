FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

EXPOSE ${PORT}

CMD ["node", "dist/main"]