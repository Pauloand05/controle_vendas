# Etapa de build
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa de produção
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]
