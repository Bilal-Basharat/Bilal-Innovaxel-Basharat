# URL Shortener

A simple RESTful API-based project for shortening URLs. Built for the Innovaxel, the project includes endpoints for CRUD operations and tracking access statistics for short links.

## 1. Overview

Create simple RESTful API that allows users to shorten long URLs. The API should
provide endpoints to create, retrieve, update, and delete short URLs. It should also provide
statistics on the number of times a short URL has been accessed.

## 2. Requirements

The API supports the following operations:

- Create a new short URL  
- Retrieve the original URL from a short code  
- Update an existing short URL  
- Delete a short URL  
- Get access statistics for a short URL  

A minimal frontend is included to interact with the API and handle redirects.

## 3. API Endpoints

### 3.1. Create Short URL  
**POST** `/shorten`  
Create a new short URL.

### 3.2. Retrieve Original URL  
**GET** `/shorten/{shortCode}`  
Retrieve the original URL from a short code.

### 3.3. Update Short URL  
**PUT** `/shorten/{shortCode}`  
Update the original URL linked to an existing short code.

### 3.4. Delete Short URL  
**DELETE** `/shorten/{shortCode}`  
Delete a short URL entry.

### 3.5. Get URL Statistics  
**GET** `/shorten/{shortCode}/stats`  
Retrieve access statistics for a short URL.

## 4. Tech Stack

- **Backend:** PHP (Laravel)  
- **Frontend:** React.js  
- **Database:** MySQL

## Instructions for executing the project
 - Download or clone the project
 - Run "composer install"
 - Run "npm install"
 - After that run the following commands to execute the project in local server
   - php artisan serve
   - npm run dev
