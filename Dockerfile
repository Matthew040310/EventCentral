ARG NODE=node:24-alpine

# ---- Base ----
FROM $NODE AS base
WORKDIR /app

# Copy package files
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm ci

# ---- Builder ----
FROM base AS builder

# Copy all source files including prisma
COPY ./ ./

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

# ---- Runner ----
FROM base AS runner

# Create non-root user
ENV USER_ID=65535
ENV GROUP_ID=65535
ENV USER_NAME=nonroot
ENV GROUP_NAME=nonroot

RUN addgroup -g $GROUP_ID $GROUP_NAME && \
    adduser --shell /sbin/nologin --disabled-password \
    --uid $USER_ID --ingroup $GROUP_NAME $USER_NAME

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy the generated Prisma client from builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy necessary config files
COPY ./next.config.ts ./tsconfig.json ./postcss.config.mjs ./eslint.config.mjs ./

# Set proper ownership for Prisma directories
RUN chown -R $USER_NAME:$GROUP_NAME node_modules/prisma
RUN chown -R $USER_NAME:$GROUP_NAME node_modules/.prisma
RUN chown -R $USER_NAME:$GROUP_NAME node_modules/@prisma
RUN chown -R $USER_NAME:$GROUP_NAME ./prisma
RUN chown -R $USER_NAME:$GROUP_NAME ./.next
RUN chown -R $USER_NAME:$GROUP_NAME ./public

USER $USER_NAME

# Set the max old space size to 259MB (default)
ENV NODE_OPTIONS="--max-old-space-size=259"

EXPOSE 3000
ENV PORT=3000

# Generate Prisma client at runtime and start
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run seed && npm start"]
# CMD ["npm", "start"]