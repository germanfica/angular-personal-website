# Etapa de construcción
FROM node:14 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de ejecución
FROM nginx:latest
COPY --from=build-step /app/dist/* /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY app.germanfica.com.crt /etc/nginx/ssl/
COPY app.germanfica.key /etc/nginx/ssl/
