FROM openjdk:11

EXPOSE 8761

ADD target/backend/discovery-server/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]