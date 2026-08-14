# ReliefGrid PK

ReliefGrid PK is a community emergency-response platform developed to demonstrate Java application development with modern DevOps practices.

The platform allows users to report local incidents, track their status, confirm community reports, and persist incident data. The project uses Gradle for build automation and dependency management, GitHub Actions for CI/CD, Docker for containerization, and AegisOps for observability using Prometheus and Grafana.

## Internship Task

### Task 3 — Java Application using Gradle

This project demonstrates:

- Automated Java builds using Gradle
- Dependency management through Gradle
- CI/CD integration using GitHub Actions
- Automated build and test execution
- Docker containerization
- Streamlined application delivery
- Monitoring using Spring Boot Actuator, Prometheus, and Grafana
- Core DevOps principles applied to a Java application

## Features

- Report community incidents
- View active incidents
- Assign severity levels
- Track incident status
- Community incident confirmations
- Persistent incident storage
- REST APIs
- Responsive web dashboard
- Health monitoring
- Prometheus metrics endpoint
- Dockerized deployment

## Technology Stack

- Java 21
- Spring Boot
- Gradle
- Spring Data JPA
- H2 Database
- Spring Boot Actuator
- Micrometer Prometheus Registry
- HTML
- CSS
- JavaScript
- Docker
- GitHub Actions
- Prometheus
- Grafana

## Project Architecture

```text
User
 │
 ▼
ReliefGrid Web Dashboard
 │
 ▼
Spring Boot REST API
 │
 ▼
Spring Data JPA
 │
 ▼
H2 Database
DevOps Workflow
Developer Push
      │
      ▼
GitHub
      │
      ▼
GitHub Actions CI/CD
      │
      ├── Java 21 Setup
      ├── Gradle Build
      ├── Automated Tests
      ├── Docker Build
      └── Container Delivery
Gradle Build Automation

The project uses the Gradle Wrapper so the application can be built consistently without requiring a manually installed Gradle version.

Build the application:

./gradlew build

On Windows:

.\gradlew.bat build

Run the application:

.\gradlew.bat bootRun

A successful Gradle build executes compilation, testing, dependency resolution, and application packaging.

Dependency Management

Dependencies are centrally managed inside build.gradle.

The project includes dependencies for:

Spring Boot Web
Spring Data JPA
H2 Database
Validation
Spring Boot Actuator
Prometheus monitoring
CI/CD Pipeline

GitHub Actions automatically runs the ReliefGrid CI/CD workflow when changes are pushed to the main branch.

The pipeline:

Checks out the source code
Configures Java 21
Configures Gradle
Builds the application
Executes tests
Builds the Docker image
Publishes the container image

Workflow configuration:

.github/workflows/gradle.yml

This provides automated verification of the application whenever new code is pushed.

Docker

ReliefGrid is packaged as a Docker container.

Build:

docker build -t reliefgrid-pk:local .

Run:

docker run --name reliefgrid-local -p 8080:8080 reliefgrid-pk:local

Application:

http://localhost:8080
REST API

Main incident API:

GET  /api/incidents
POST /api/incidents

Community confirmation:

POST /api/incidents/{id}/confirm

Incident status management:

PATCH /api/incidents/{id}/status
Database

ReliefGrid uses H2 with Spring Data JPA.

Incident data includes:

ID
Incident type
Area
Description
Severity
Status
Reported time
Community confirmations

Database persistence allows incident information to survive application restarts.

Monitoring and Observability

ReliefGrid exposes Prometheus-compatible metrics using Spring Boot Actuator and Micrometer:

http://localhost:8080/actuator/prometheus

ReliefGrid is integrated with the AegisOps observability platform.

ReliefGrid
    │
    ▼
Spring Boot Actuator
    │
    ▼
Prometheus
    │
    ▼
Grafana
    │
    ▼
AegisOps Observability Dashboard

AegisOps currently monitors:

ReliefGrid service health
HTTP request rate
JVM memory usage
Application performance metrics

AegisOps repository:

https://github.com/KhadijaAzhar902/AegisOps-DevOps-Monitoring

Screenshots
ReliefGrid Dashboard

Incident Reporting

Gradle Build

Docker Deployment

GitHub Actions CI/CD

AegisOps Monitoring Integration

DevOps Concepts Demonstrated

This project demonstrates practical use of:

Build automation
Dependency management
Continuous Integration
Continuous Delivery
Containerization
Application health monitoring
Metrics collection
Observability
Persistent data storage
Automated testing
Version control
Troubleshooting
Author

Khadija Azhar

Computer Science Student
DevOps Internship Project by CodeAlpha