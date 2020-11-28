FROM openjdk:11

EXPOSE 8761

RUN PWD
ADD /*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]