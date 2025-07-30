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
