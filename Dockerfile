FROM node:20-alpine AS base
WORKDIR /app
ENV TZ=UTC

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS build
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/build ./build
COPY --from=build /app/config ./config
COPY --from=build /app/ref_docs ./ref_docs
COPY --from=build /app/specs ./specs
COPY --from=build /app/LICENSE ./LICENSE
COPY --from=build /app/README.md ./README.md
COPY --from=build /app/.env.example ./.env.example
EXPOSE 4000
CMD ["node", "-r", "dotenv/config", "build/src/index.js"]
