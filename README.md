# IonianFarsi - آیونیان فارسی
[http://ionianfarsi.gr/](http://ionianfarsi.gr/)
[![ionianFarsi logo](https://ionianfarsi.gr/static/media/IonianFarsiLogo.84d7d4110ea94c66ec9a.png)](http://ionianfarsi.gr/)


## Abstract  
IonianFarsi is a multimedia online extracurricular application designed for the learning and reinforcement of the Persian language, utilizing the [1st Step](https://books.saadifoundation.ir/books/en1ststep) book of [Bonyade saadi](https://saadifoundation.ir/en).

---

## Features  
- **Vocabulary**: Interactive Vocabulary following the 1stStep book structure.  
- **Exercises**: Infinite practice exercises for vocabulary reinforcement.

---




## Methodology  
- **Database Setup**: Create a MySQL database with course-related words from the 1stStep book in phpmyadmin.  
- **API Development**: Develop an API for the application's interaction with the database using Node/Express.js.  
- **Front-End Development**: Build the application's user interface using React.js.  
- **Prototyping Model**: Prototyping approach used during development.

---

## Online hosted application:  
   - Hosting: [Netlify](https://www.netlify.com)  
   - Database: [FreeMySQLHosting](https://www.freesqldatabase.com/)
   - API: [Render](https://render.com/)
   - Domain name: [papaki.com](https://www.papaki.com/)
## API Reference

#### Get all sections
```http
  GET /api/sections
```


#### Get a particular lesson (Need Authentication)
```http
  GET /api/lessons?lesson_id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lesson_id`      | `string` | **Required**. Lesson_id to fetch a specific lesson |



#### Get all lessons info of a section
```http
  GET /api/lessons?section_id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `section_id`      | `string` | **Required**. Section_id to fetch lessons info |



#### Get pronunciation of each letter
```http
  GET /api/letters/pronunciation
```



### Get USER
```http
  GET /api/users
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




### Get Vocabulary
```http
  GET /api/vocabulary
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
