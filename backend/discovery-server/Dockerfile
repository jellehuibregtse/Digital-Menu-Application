FROM openjdk:11

EXPOSE 8761

RUN PWD
ADD target/discovery-*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]