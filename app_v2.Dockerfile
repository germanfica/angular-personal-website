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
# Asegúrate de copiar la estructura completa del directorio dist/personal
COPY --from=build-step /app/dist/personal/ ./

EXPOSE 3000
CMD ["node", "server/server.mjs"]
