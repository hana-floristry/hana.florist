FROM node:latest

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

WORKDIR /hana
COPY . .

RUN npm ci
RUN npm run build
RUN mv ./dist/ ./src/server/dist/
RUN mkdir -p ./src/server/dist/uploads/

RUN npx prisma generate

CMD /wait && npm run start
