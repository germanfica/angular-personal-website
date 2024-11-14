# Etapa de construcción
# FROM node:18 as build-step
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# Etapa de ejecución
FROM nginx:latest

# ENV ABORT_ENV_VARIABLE=false

# RUN if [ "$ABORT_ENV_VARIABLE" = "true" ]; then echo "Abortando la construcción porque ABORT_ENV_VARIABLE es true"; exit 1; fi

#COPY --from=build-step /app/dist/personal/* /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY app.germanfica.com.crt /etc/nginx/ssl/
COPY app.germanfica.key /etc/nginx/ssl/
COPY localhost.crt /etc/nginx/ssl/
COPY localhost.key /etc/nginx/ssl/
