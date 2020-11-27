FROM alpine:latest


ENV JAVA_HOME="/usr/lib/jvm/default-jvm/"
RUN apk add openjdk11

# Has to be set explictly to find binaries 
ENV PATH=$PATH:${JAVA_HOME}/bin

EXPOSE 8761

ADD target/backend/discovery-server/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]