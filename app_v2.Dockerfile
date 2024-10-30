# Etapa de construcción
FROM node:18 as build-step
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de ejecución
FROM node:18-alpine as ssr-server
WORKDIR /app

# TODO: esto también deberia instalarse en otra etapa no en la final, no deberia estar en la imagen final
# Instala gettext para usar envsubst
RUN apk add --no-cache gettext

# Asegúrate de copiar la estructura completa del directorio dist/personal
COPY --from=build-step /app/dist/personal/ ./

# TODO: esto deberia hacerse aparte en otra etapa de construcción de imagen al igual

# Sustituye la variable de entorno en el `index.html` usando envsubst
ARG APP_BASE_PATH
ENV APP_BASE_PATH=${APP_BASE_PATH}
RUN envsubst '${APP_BASE_PATH}' < /app/server/index.server.html > /app/server/index.server.temp.html && \
    mv /app/server/index.server.temp.html /app/server/index.server.html
RUN envsubst '${APP_BASE_PATH}' < /app/browser/index.html > /app/browser/index.temp.html && \
mv /app/browser/index.temp.html /app/browser/index.html

EXPOSE 3000
CMD ["node", "server/server.mjs"]
