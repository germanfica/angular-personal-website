# Etapa de construcción
FROM node:18 as build-step

# Configurar variables de entorno
ARG APP_BASE_PATH
ARG APP_OUTPUT_PATH
ENV APP_BASE_PATH=${APP_BASE_PATH}
ENV APP_OUTPUT_PATH=${APP_OUTPUT_PATH}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# RUN npm run replace-base-path

# Etapa de ejecución
FROM node:18-alpine as ssr-server
WORKDIR /app
# Asegúrate de copiar la estructura completa del directorio dist/personal
COPY --from=build-step /app/dist/personal/ ./

EXPOSE 3000
CMD ["node", "server/server.mjs"]
# CMD ["tail", "-f", "/dev/null"]