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

# Sustituye la variable de entorno en el `index.html` usando envsubst
ARG APP_BASE_PATH
ENV APP_BASE_PATH=${APP_BASE_PATH}

# Asegúrate de copiar la estructura completa del directorio dist/personal
COPY --from=build-step /app/dist/personal/ ./${APP_BASE_PATH}/

# TODO: esto deberia hacerse aparte en otra etapa de construcción de imagen al igual

RUN envsubst '${APP_BASE_PATH}' < /app/${APP_BASE_PATH}/server/index.server.html > /app/${APP_BASE_PATH}/server/index.server.temp.html && \
    mv /app/${APP_BASE_PATH}/server/index.server.temp.html /app/${APP_BASE_PATH}/server/index.server.html
RUN envsubst '${APP_BASE_PATH}' < /app/${APP_BASE_PATH}/browser/index.html > /app/${APP_BASE_PATH}/browser/index.temp.html && \
    mv /app/${APP_BASE_PATH}/browser/index.temp.html /app/${APP_BASE_PATH}/browser/index.html

# Crear un script de inicio para expandir APP_BASE_PATH en la ruta
RUN echo -e "#!/bin/sh\nnode /app/\${APP_BASE_PATH}/server/server.mjs" > /app/start.sh
RUN chmod +x /app/start.sh

# Expone el puerto
EXPOSE 3000

# Ejecuta el script de inicio
CMD ["/app/start.sh"]
