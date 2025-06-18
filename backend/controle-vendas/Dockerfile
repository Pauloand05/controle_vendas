# Estágio de build
FROM amazoncorretto:17-alpine AS builder

WORKDIR /app

# 1. Copia os arquivos essenciais primeiro
COPY .mvn/wrapper .mvn/wrapper
COPY mvnw pom.xml ./

# 2. Pré-processamento (usando apk do Alpine)
RUN apk add --no-cache dos2unix && \
    dos2unix mvnw && \
    chmod +x mvnw && \
    ./mvnw --version

# 3. Copia o código fonte
COPY src src

# 4. Executa o build
RUN ./mvnw clean package -DskipTests

# Estágio de execução
FROM amazoncorretto:17-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]