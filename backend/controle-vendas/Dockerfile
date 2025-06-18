# Usa imagem do JDK
FROM openjdk:21-jdk

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o projeto
COPY . .

# Compila o projeto com Maven
RUN ./mvnw clean package -DskipTests

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Executa o JAR
CMD ["java", "-jar", "target/controle-vendas-0.0.1-SNAPSHOT.jar"]
