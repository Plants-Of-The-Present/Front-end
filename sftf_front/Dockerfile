# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências (TypeScript já será instalado via package.json)
RUN npm install

# Copiar todo o projeto
COPY . .

# Build do app para produção
RUN npm run build

# Stage 2: Serve com Nginx
FROM nginx:alpine

# Copiar build do React para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração do Nginx para lidar com React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]