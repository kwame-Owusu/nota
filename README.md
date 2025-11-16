# Nota

nota is a simple and lightweight CRUD notes application featuring:

- A Go backend built using the Go standard library

- A React + DaisyUI frontend for a clean and responsive UI

- Full CRUD functionality: Create, Read, Update, Delete notes


## Features
Create notes with a title and body , View all notes in a responsive UI , Edit existing notes and Delete notes.
Pretty standard stuff when it comes to CRUD applications. as CRUD as it can be.

Wrote the backend in Go, used the standard library for making routing and endpoints. This exposed me to the world of writing endpoints in Go.
I like this language now, bye bye ts/js on the backend 😭.

## Tech Stack
### Backend

Go (Standard Library) + mongo Go driver

net/http for server and routing


### Frontend

React + DaisyUI
Axios for data fetching

## Running the project
For running the backend make sure to have golang installed on your system.
```bash
cd go-backend
go run cmd/*.go
```

for frontend, standard procedure
```bash
cd frontend
npm install
npm start

```
### demo


https://github.com/user-attachments/assets/855aa57d-da55-4370-85c7-f29392d2f252



### CRUD API overview

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/notes`      | Get all notes           |
| POST   | `/notes`      | Create a new note       |
| PUT    | `/notes/{id}` | Update an existing note |
| DELETE | `/notes/{id}` | Delete a note           |


### Learning
I initially made the project with an express backend. But during the last month I have been learning golang and wanted to rewrite the backend on this project. Because it is a basic CRUD application.
I have been learning Go, and I can say that I am enjoying the language. 
Of course I am still in my early days, but I do want to get better at this language, I love the syntax and the things it gives out of the box.
Can expect more golang projects on the way. whether it be CLI tools and programs, or writing API's. 
