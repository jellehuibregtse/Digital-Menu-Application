FROM openjdk:11

EXPOSE 8761

ADD target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]