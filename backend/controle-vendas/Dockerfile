# Estágio de build
FROM amazoncorretto:17 AS builder

WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Força permissões Unix e instala JDK
RUN microdnf install dos2unix -y && \
    dos2unix mvnw && \
    chmod +x mvnw && \
    ./mvnw dependency:go-offline -B

COPY src src
RUN ./mvnw clean package -DskipTests

# Estágio de execução
FROM amazoncorretto:17
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]