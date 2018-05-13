FROM node:carbon

WORKDIR /build/app
COPY package*.json ./

RUN npm --registry=https://registry.npm.taobao.org install

COPY . .

EXPOSE 8080

RUN npm run build

FROM nginx


COPY --from=0 /build/app/www/dist /usr/share/nginx/html/



