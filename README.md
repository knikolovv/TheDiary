<div align="center">
  <h1>TheDiary</h1>
  <p>Full-stack web app for managing personal notes, events, finances, and meal tracking</p>
  <img src="https://img.shields.io/badge/JavaScript & React-Frontend-blue">
  <img src="https://img.shields.io/badge/Java & Spring Boot-Backend-brightgreen" alt="Java & Spring Boot">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blueviolet" alt="PostgreSQL"> 
</div>

---

## Table of Contents

- **Features**

- **Getting Started**

  - **Prerequisites**

  - **Installation**

- **Frontend**

- **Backend**

- **License**

## Features
- **Notes Management:** Create, edit, and delete notes.

- **Calendar Events:** Schedule and manage events using a calendar by @fullCalendar.

- **Finance Tracking:** Log and organize income and expenses to monitor financial activity.

- **Meal Logging:** Track meals and nutritional intake with manual input or by searching food data via the Open Food Facts API.

- **Full CRUD Operations:** Each feature supports full create, read, update, and delete capabilities.

- **UI:** Combines Material UI components and custom-designed elements.


## Getting Started

### Prerequisites

- **Node.js & npm (for frontend)** - [Download Node.js](https://nodejs.org/en)

- **Java JDK 8+ (for backend)** - [Download Java](https://www.oracle.com/java/technologies/downloads/)

- **Maven for backend dependency management** - [Download Maven](https://maven.apache.org/download.cgi)

- **PostgreSQL Database** (Or any other relational database) - [Download PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/knikolovv/TheDiary.git
   cd TheDiary
   ```
2. **Configure backend:**

  - **Navigate to the backend folder:**
 
     ```bash
     cd backend
     ```
     
  - **Configure your PostgreSQL settings:**

Configure your database settings in `src/main/resources/application.properties`.

  - **Build and run the backend:**
 
     ```bash
     mvn clean install
     mvn spring-boot:run
     ```

The backend will run on http://localhost:8080.

3. **Configure frontend:**

  - **Navigate to the frontend folder:**

     ```bash
     cd frontend
     ```
  - **Install dependencies and start the development server:**

    ```bash
    npm install
    npm start
    ```

The frontend will run on http://localhost:3000.


## Frontend

- **Built with React and Material UI.**

- **Includes custom components for note-taking, financial tracking, and meal logging.**

- **Uses @fullCalendar for managing events.**

## Backend

- **Uses Java Spring Boot with Hibernate ORM for database interaction.**

- **RESTful endpoints handle CRUD operations for all entities (notes, events, finances, meals).**

- **PostgreSQL is used as the main database.**
