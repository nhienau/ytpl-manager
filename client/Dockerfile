FROM node:20-alpine AS build

RUN mkdir -p /home/app/ytpl-client/node_modules && chown -R node:node /home/app/ytpl-client

WORKDIR /home/app/ytpl-client

COPY package*.json ./

RUN npm ci --unsafe-perm=true --quiet

COPY --chown=node:node . .

RUN npm run build

FROM nginx:1.28.0-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /home/app/ytpl-client/dist /var/www/html/

EXPOSE 5001

ENTRYPOINT ["nginx", "-g", "daemon off;"]