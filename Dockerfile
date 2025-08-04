# Install dependencies only when needed
FROM node:24-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:24-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG BUILD_TIME

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM node:24-alpine AS runner

# Install curl for healthcheck in container definition
RUN apk add --update \
    curl \
    dumb-init \
    && rm -rf /var/cache/apk/*
    
WORKDIR /app

RUN npm prune --production

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy ALL node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy necessary config files
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/eslint.config.mjs ./eslint.config.mjs

# Copy package files for npm scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Copy built Next.js application
COPY --from=builder /app/.next ./.next

# Create non-root user
ENV USER_ID=65535
ENV GROUP_ID=65535
ENV USER_NAME=nonroot
ENV GROUP_NAME=nonroot
ENV npm_config_cache=/home/$USER_NAME/.

RUN addgroup -g $GROUP_ID $GROUP_NAME && \
    adduser --shell /sbin/nologin --disabled-password \
    --uid $USER_ID --ingroup $GROUP_NAME $USER_NAME

# Set proper ownership for all application files
RUN chown -R $USER_NAME:$GROUP_NAME /app

USER $USER_NAME

# Set the max old space size to 259MB (default)
ENV NODE_OPTIONS="--max-old-space-size=259"

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED=1
ENTRYPOINT ["dumb-init", "--"]

# Fresh DB - Run once then use below command
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run seed && npm start"]

# # Existing DB 
# CMD ["sh", "-c", "npx prisma migrate && npx prisma generate && npm start"]