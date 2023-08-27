# For Java 11, try this
FROM adoptopenjdk/openjdk11:alpine-jre

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} mock-bank.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar","/mock-bank.jar"]