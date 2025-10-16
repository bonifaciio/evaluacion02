# Etapa 1: Construcción con Maven
FROM maven:3.9.5-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar archivos de configuración de Maven
COPY pom.xml .
COPY src ./src

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Etapa 2: Imagen de ejecución
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copiar el JAR compilado desde la etapa de construcción
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto 8080
EXPOSE 8080

# Variables de entorno (serán sobrescritas por docker-compose)
ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/hospital_db?useSSL=false&serverTimezone=UTC
ENV SPRING_DATASOURCE_USERNAME=hospital_user
ENV SPRING_DATASOURCE_PASSWORD=hospital_password

# Comando de inicio
ENTRYPOINT ["java", "-jar", "app.jar"]
