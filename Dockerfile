FROM node:16-alpine AS BUILD_IMAGE

RUN apk add --update nodejs npm g++ make py3-pip

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
FROM node:16-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

# ENV NODE_ENV production

ENV PORT 3014
ENV DB_HOST ec2-52-207-90-231.compute-1.amazonaws.com
ENV DB_PORT 5432
ENV DB_USER wtsjvblwtsfebe
ENV DB_PASSWORD f5de6f17c9c3f5f9242a905bfc91d56607803353300f088668c78f83b72e8a68
ENV DB_SCHEMA public
ENV DB_DATABASE db7d7ubj7euo3n
ENV DATABASE_URL postgres://wtsjvblwtsfebe:f5de6f17c9c3f5f9242a905bfc91d56607803353300f088668c78f83b72e8a68@ec2-52-207-90-231.compute-1.amazonaws.com:5432/db7d7ubj7euo3n
ENV SECRET_KEY sEeDsSuCCessAmiN
ENV LOG_FORMAT dev
ENV LOG_DIR ../logs
ENV ORIGIN *
ENV CREDENTIALS true
ENV HOST https://seeds-dev-api.herokuapp.com

EXPOSE 3014

RUN ls

CMD ["npx", "cross-env", "NODE_ENV=production", "node", "dist/server.js"]
