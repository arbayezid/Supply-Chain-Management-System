@echo off
echo Starting Supply Chain Management Backend...
echo.
echo This will download Maven if needed and start the Spring Boot application.
echo.
echo Make sure you have Java JDK 17+ installed and JAVA_HOME set.
echo.
pause
echo.
echo Starting backend...
call mvnw.cmd spring-boot:run
pause

