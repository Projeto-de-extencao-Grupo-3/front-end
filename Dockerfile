# Estágio de Build (Vite)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Não precisamos mais de ARG ou ENV do Vite aqui, pois o React usará caminhos relativos (/api)
RUN npm run build

# Servir com Nginx
FROM nginx:1.27-alpine

# 1. Copia o build do React
COPY --from=build /app/dist /usr/share/nginx/html

# 2. Copia o TEMPLATE do nginx para a pasta de templates oficial do Nginx
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
# O Nginx por padrão já executa o envsubst nos arquivos dessa pasta 'templates' antes de iniciar!
CMD ["nginx", "-g", "daemon off;"]