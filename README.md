# Mahasiswa CRUD App

This is a simple CRUD application for managing university students built using **Spring Boot** (backend) and **HTML + Bootstrap 5** (frontend).

---

## 🧰 Tech Stack

- **Java** : Core programming language
- **Spring Boot** : Backend framework for building RESTful APIs
- **MySQL** : Relational database to store student data
- **HTML + Bootstrap 5** : Frontend design for a responsive user interface

---

## Project Structure

- **main branch**: Frontend (Bootstrap HTML)
- **backend branch**: Backend (Spring Boot + MySQL)

---

## How to Run the Project

### Backend (Spring Boot)

#### 1. Clone the Repository & Checkout Backend Branch:

```bash
git clone https://github.com/sukiceng/mahasiswa-crud-springboot.git
cd mahasiswa-crud-springboot
git checkout backend
```
#### 2. Configure database connection in "application.properties"
Edit the file at src/main/resources/application.properties:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/mahasiswa_db
spring.datasource.username=root
spring.datasource.password= *Leave it blank if youre using root user in MySQL databases*

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
Make sure you have created a database named mahasiswa_db in your MySQL database.

#### 3. Run the Spring Boot App
Using IntelliJ or via terminal:
```bash
./mvnw spring-boot:run
```
By deafult the API will be available at "http://localhost:8080/api/mahasiswa"

---

### Frontend (HTML + Bootstrap)

#### 1. Switch to the Main Branch:
```bash
git checkout main
```
#### 2. Open in Browser : 
Open the index.html file directly in your browser, or use Live Server extension in VS Code for a better experience.
#### 3. Make Sure Backend is Running

---

## API Endpoints
| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/mahasiswa`      | Get all students     |
| GET    | `/api/mahasiswa/{id}` | Get student by ID    |
| POST   | `/api/mahasiswa`      | Add new student      |
| PUT    | `/api/mahasiswa/{id}` | Update student by ID |
| DELETE | `/api/mahasiswa/{id}` | Delete student by ID |


