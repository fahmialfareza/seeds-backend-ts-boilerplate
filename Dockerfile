FROM node:12-alpine AS BUILD_IMAGE

RUN apk add --update nodejs npm

COPY package.json ./

COPY tsconfig.json ./

COPY . ./app

WORKDIR /app

RUN npm install

ENV NODE_ENV production

RUN npx tsc

RUN npx tsc-alias

RUN npm prune --production

# Production build stage
# FROM common-build-stage as production-build-stage
FROM node:12-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

# ENV NODE_ENV production

ENV PORT 3014
ENV DB_HOST 18.139.243.221
ENV DB_PORT 5432
ENV DB_USER postgres
ENV DB_PASSWORD seeds2022
ENV DB_SCHEMA seeds_dev
ENV DB_DATABASE postgres
ENV SECRET_KEY sEeDsSuCCessAmiN
ENV LOG_FORMAT dev
ENV LOG_DIR ../logs
ENV ORIGIN *
ENV CREDENTIALS true

EXPOSE 3014

RUN ls

CMD ["npx", "cross-env", "NODE_ENV=production", "node", "dist/server.js"]
