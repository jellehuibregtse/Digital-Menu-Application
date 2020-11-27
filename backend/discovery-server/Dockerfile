FROM openjdk:11-alpine

EXPOSE 8761

ADD target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]