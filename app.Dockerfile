# Etapa de construcción
FROM node:18 as build-step

# Configurar variables de entorno
ARG API_DEV_BASE_URL
ARG API_PROD_BASE_URL
ARG API_CONTACT
ARG API_RECAPTCHA_SITE_KEY
ENV API_DEV_BASE_URL=${API_DEV_BASE_URL}
ENV API_PROD_BASE_URL=${API_PROD_BASE_URL}
ENV API_CONTACT=${API_CONTACT}
ENV API_RECAPTCHA_SITE_KEY=${API_RECAPTCHA_SITE_KEY}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de ejecución
FROM node:18-alpine as ssr-server
WORKDIR /app
# Asegúrate de copiar la estructura completa del directorio dist/personal
COPY --from=build-step /app/dist/personal/ ./

EXPOSE 4000
CMD ["node", "server/server.mjs"]
