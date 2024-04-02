# Etapa de construcción para la app
FROM node:18 as build-step
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de construcción para Nginx
FROM nginx:latest as nginx-server
# No seria necesario porque ssr-server se encarga de eso
# COPY --from=build-step /app/dist/personal/* /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY app.germanfica.com.crt /etc/nginx/ssl/
COPY app.germanfica.key /etc/nginx/ssl/
COPY localhost.crt /etc/nginx/ssl/
COPY localhost.key /etc/nginx/ssl/

# Etapa de ejecución para el servidor SSR de Node.js
FROM node:18-alpine as ssr-server
WORKDIR /app
COPY --from=build-step /app/dist/personal/ ./
EXPOSE 4000
CMD ["node", "server/server.mjs"]
