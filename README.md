
# ReliefGrid PK

**ReliefGrid PK** is a community emergency-response platform developed as part of a DevOps internship project for **CodeAlpha**.

The application allows users to report local incidents, view active reports, track incident status, confirm community reports, and persist incident data.

The project demonstrates how a Java application can be combined with modern DevOps practices using **Gradle, GitHub Actions, Docker, Spring Boot Actuator, Prometheus, Grafana, and AegisOps**.

---

## Internship Task

### Task 3 — Java Application using Gradle

ReliefGrid PK was developed to demonstrate:

- Automated Java project builds using Gradle
- Dependency management using Gradle
- Continuous Integration and Continuous Delivery using GitHub Actions
- Automated build and test execution
- Docker containerization
- Streamlined application delivery
- Application health monitoring
- Prometheus metrics collection
- Grafana observability
- Core DevOps principles in Java development

---

## Features

- Report community incidents
- View active incidents
- Assign incident severity
- Track incident status
- Community incident confirmations
- Persistent incident storage
- REST APIs
- Web-based dashboard
- Spring Boot health monitoring
- Prometheus-compatible metrics
- Dockerized application
- Automated CI/CD pipeline

---

## Technology Stack

### Application

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- HTML
- CSS
- JavaScript

### Build and DevOps

- Gradle
- Gradle Wrapper
- Git
- GitHub
- GitHub Actions
- Docker

### Monitoring and Observability

- Spring Boot Actuator
- Micrometer Prometheus Registry
- Prometheus
- Grafana
- AegisOps

---

## Project Architecture

```
User
 |
 v
ReliefGrid Web Dashboard
 |
 v
Spring Boot REST API
 |
 v
Spring Data JPA
 |
 v
H2 Database
```

The frontend communicates with the Spring Boot REST API, while Spring Data JPA handles communication with the H2 database.

---

## DevOps Workflow

```
Developer Push
      |
      v
    GitHub
      |
      v
GitHub Actions CI/CD
      |
      +-- Java 21 Setup
      +-- Gradle Build
      +-- Automated Tests
      +-- Docker Image Build
      +-- Container Delivery
```

Whenever changes are pushed to the `main` branch, GitHub Actions automatically runs the CI/CD workflow.

---

## Gradle Build Automation

ReliefGrid uses the **Gradle Wrapper**, allowing the project to be built consistently without requiring Gradle to be manually installed.

### Build the Application

Linux/macOS:

```
./gradlew build
```

Windows:

```
.\gradlew.bat build
```

### Run the Application

Windows:

```
.\gradlew.bat bootRun
```

A successful Gradle build performs compilation, dependency resolution, automated testing, and application packaging.

---

## Dependency Management

Application dependencies are managed inside:

```
build.gradle
```

The project includes dependencies for:

- Spring Boot Web
- Spring Data JPA
- H2 Database
- Validation
- Spring Boot Actuator
- Micrometer Prometheus Registry

Using Gradle provides centralized and reproducible dependency management.

---

## CI/CD Pipeline

ReliefGrid uses **GitHub Actions** for Continuous Integration and Continuous Delivery.

The workflow is stored at:

```
.github/workflows/gradle.yml
```

The pipeline automatically:

1. Checks out the repository
2. Configures Java 21
3. Configures Gradle
4. Builds the application
5. Executes automated tests
6. Builds the Docker image
7. Publishes the container image on pushes to the main branch

This ensures that new changes are automatically tested and packaged before delivery.

---

## Docker Containerization

ReliefGrid is packaged as a Docker image using the included `Dockerfile`.

### Build the Docker Image

```
docker build -t reliefgrid-pk:local .
```

### Run the Container

```
docker run --name reliefgrid-local -p 8080:8080 -v reliefgrid-data:/app/data reliefgrid-pk:local
```

The named Docker volume preserves the application's database data.

After starting the application, open:

```
http://localhost:8080
```

---

## REST API

ReliefGrid exposes REST endpoints for incident management.

### Get All Incidents

```
GET /api/incidents
```

### Create an Incident

```
POST /api/incidents
```

### Confirm an Incident

```
POST /api/incidents/{id}/confirm
```

### Update Incident Status

```
PATCH /api/incidents/{id}/status?status=STATUS
```

These endpoints allow the frontend to communicate with the Spring Boot backend.

---

## Database

ReliefGrid uses **H2 Database** together with **Spring Data JPA**.

Each incident can store:

- ID
- Incident type
- Area
- Description
- Severity
- Status
- Reported time
- Community confirmation count

The database is configured as persistent file storage so incident data can survive application restarts.

---

## Health Monitoring

Spring Boot Actuator provides application health information.

Health endpoint:

```
http://localhost:8080/actuator/health
```

This endpoint can be used to verify whether the ReliefGrid application is running correctly.

---

## Prometheus Metrics

ReliefGrid uses **Spring Boot Actuator and Micrometer** to expose Prometheus-compatible metrics.

Metrics endpoint:

```
http://localhost:8080/actuator/prometheus
```

These metrics provide information about application health, HTTP requests, JVM memory, process activity, and system performance.

---

## AegisOps Monitoring Integration

ReliefGrid is integrated with **AegisOps**, a separate Docker-based observability project using Prometheus and Grafana.

The monitoring flow is:

```
ReliefGrid
    |
    v
Spring Boot Actuator
    |
    v
Micrometer
    |
    v
Prometheus
    |
    v
Grafana
    |
    v
AegisOps Observability Dashboard
```

Prometheus scrapes ReliefGrid using the `reliefgrid` monitoring job.

AegisOps currently monitors three major ReliefGrid metrics.

### ReliefGrid Service Status

Checks whether the ReliefGrid application can be reached by Prometheus.

```
up{job="reliefgrid"}
```

### ReliefGrid Request Rate

Tracks HTTP traffic handled by the Spring Boot application.

```
sum(rate(http_server_requests_seconds_count{job="reliefgrid"}[1m]))
```

### ReliefGrid JVM Memory

Tracks memory being used by the Java Virtual Machine.

```
sum(jvm_memory_used_bytes{job="reliefgrid"}) / 1024 / 1024
```

This integration demonstrates how a Java/Spring Boot application can be monitored using the same observability infrastructure as another application.

### AegisOps Repository

https://github.com/KhadijaAzhar902/AegisOps-DevOps-Monitoring

---

## Monitoring Architecture

```
ReliefGrid PK
Java + Spring Boot
       |
       | /actuator/prometheus
       v
   Prometheus
       |
       v
     Grafana
       |
       v
AegisOps Observability Dashboard
```

This provides visibility into ReliefGrid service availability, request traffic, and JVM resource usage.

---

## ReliefGrid Screenshots

## Screenshots

### ReliefGrid Dashboard

![ReliefGrid Dashboard](ReliefGrid%20ScreenShots/01-reliefgrid-dashboardd.png)

### Incident Reporting

![Incident Reporting](ReliefGrid%20ScreenShots/02-report-incident-working.png)

### Successful Gradle Build

![Gradle Build](ReliefGrid%20ScreenShots/03-gradle-build-successful.png)

### ReliefGrid Docker Container

![Docker Container](ReliefGrid%20ScreenShots/04-docker-reliefgrid-running.png)

### GitHub Actions CI/CD

![GitHub Actions](ReliefGrid%20ScreenShots/05-github-actions-cicd-success.png)

### AegisOps and ReliefGrid Monitoring

![AegisOps ReliefGrid Monitoring](ReliefGrid%20ScreenShots/06-aegisops-reliefgrid-monitoring.png)

---

## DevOps Concepts Demonstrated

ReliefGrid demonstrates practical use of:

- Build automation
- Dependency management
- Continuous Integration
- Continuous Delivery
- Automated testing
- Version control
- Docker containerization
- Persistent storage
- Application health monitoring
- Metrics collection
- Prometheus monitoring
- Grafana visualization
- JVM monitoring
- Observability
- Cross-project integration
- DevOps troubleshooting

---

## Project Structure

```
ReliefGrid-PK
|
+-- .github
|   +-- workflows
|       +-- gradle.yml
|
+-- gradle
|   +-- wrapper
|
+-- src
|   +-- main
|   |   +-- java
|   |   |   +-- pk
|   |   |       +-- reliefgrid
|   |   |
|   |   +-- resources
|   |       +-- static
|   |       +-- application.properties
|   |
|   +-- test
|
+-- screenshots
|
+-- build.gradle
+-- settings.gradle
+-- gradlew
+-- gradlew.bat
+-- Dockerfile
+-- .dockerignore
+-- .gitignore
+-- README.md
```

---

## Running the Project

### 1. Clone the Repository

```
git clone https://github.com/KhadijaAzhar902/ReliefGrid-PK.git
```

### 2. Enter the Project Directory

```
cd ReliefGrid-PK
```

### 3. Run with Gradle

On Windows:

```
.\gradlew.bat bootRun
```

Or run using Docker:

```
docker build -t reliefgrid-pk:local .
docker run --name reliefgrid-local -p 8080:8080 -v reliefgrid-data:/app/data reliefgrid-pk:local
```

### 4. Open ReliefGrid

```
http://localhost:8080
```

### 5. Check Application Health

```
http://localhost:8080/actuator/health
```

### 6. View Prometheus Metrics

```
http://localhost:8080/actuator/prometheus
```

---

## What This Project Demonstrates

ReliefGrid started as a Java application built with Gradle and was extended into a complete DevOps workflow.

```
Java Application
      |
      v
Gradle Build Automation
      |
      v
GitHub Actions CI/CD
      |
      v
Docker Container
      |
      v
Spring Boot Actuator
      |
      v
Prometheus
      |
      v
Grafana / AegisOps
```

The result demonstrates the application lifecycle from **development and build automation to containerization, automated delivery, and operational monitoring**.

---

## Author
**Khadija Azhar**
DevOps Internship Project by **CodeAlpha**
