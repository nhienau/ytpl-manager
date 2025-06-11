FROM node:20-alpine

RUN mkdir -p /home/app/ytpl-server/node_modules && chown -R node:node /home/app/ytpl-server

WORKDIR /home/app/ytpl-server

COPY package*.json ./

RUN npm ci --unsafe-perm=true --quiet

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "npm", "start" ]