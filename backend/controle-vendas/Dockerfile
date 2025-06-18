# Estágio de build
FROM amazoncorretto:17 AS builder

WORKDIR /app

# 1. Copia primeiro os arquivos essenciais
COPY .mvn/wrapper .mvn/wrapper
COPY mvnw pom.xml ./

# 2. Pré-configuração (crucial para Windows)
RUN apt-get update && apt-get install -y dos2unix && \
    dos2unix mvnw && \
    chmod +x mvnw && \
    ./mvnw --version

# 3. Copia o código fonte
COPY src src

# 4. Build do projeto
RUN ./mvnw clean package -DskipTests

# Estágio de execução
FROM amazoncorretto:17
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]