FROM node:20-alpine AS base
WORKDIR /app
ENV TZ=UTC

FROM base AS deps
# Copy package files (root and all packages)
COPY package*.json ./
# Copy packages directory structure (needed for local file dependencies)
COPY packages ./packages
RUN npm ci

FROM base AS build
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build all packages first, then build main app
RUN cd packages/core && npm run build && \
    cd ../cache-redis && npm run build && \
    cd ../log-clickhouse && npm run build && \
    cd ../server && npm run build && \
    cd ../.. && npm run build

FROM base AS runtime
ENV NODE_ENV=production
COPY package*.json ./
# Copy packages directory with built dist folders (needed for local file dependencies at runtime)
COPY --from=build /app/packages ./packages
RUN npm ci --omit=dev
# Copy built artifacts
COPY --from=build /app/build ./build
COPY --from=build /app/config ./config
COPY --from=build /app/ref_docs ./ref_docs
COPY --from=build /app/specs ./specs
COPY --from=build /app/LICENSE ./LICENSE
COPY --from=build /app/README.md ./README.md
COPY --from=build /app/.env.example ./.env.example
EXPOSE 4000
CMD ["node", "-r", "dotenv/config", "build/src/index.js"]
