# API Reference

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



#### Get all users (Need Authentication)
```http
  GET /api/users
```


# Users API

Base URL: `/api/users`

---

### Get all public profiles
\`\`\`http
GET /api/users
\`\`\`
**Description:**  
Returns a list of all users’ public profiles.  
**Authentication:** Not required.

---

### Get my private profile
\`\`\`http
GET /api/users/me
\`\`\`
**Description:**  
Returns the authenticated user’s private profile information.  
**Authentication:** Required (access token).  

---

### Update my private profile
\`\`\`http
PUT /api/users/me
\`\`\`
**Description:**  
Update the authenticated user’s profile fields (non-password). Only provided fields will be updated.  

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`           | `string`  | Optional, 3-35 characters |
| `email`          | `string`  | Optional, valid email |
| `experience`     | `number`  | Optional, integer >= 0 |
| `current_section`| `number`  | Optional, integer >= 1 |
| `current_unit`   | `number`  | Optional, integer >= 1 |
| `current_repetition` | `number` | Optional, integer 1-9 |
| `current_lesson` | `number`  | Optional, integer >= 1 |

**Authentication:** Required (access token).  

---

### Change my password
\`\`\`http
PUT /api/users/me/changepassword
\`\`\`
**Description:**  
Change the authenticated user’s password. Requires both `old_password` and `new_password`.  

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `old_password` | `string` | Required |
| `new_password` | `string` | Required |

**Authentication:** Required (access token).  

---

### Change my username
\`\`\`http
PUT /api/users/me/changeusername
\`\`\`
**Description:**  
Change the authenticated user’s username. Requires the current refresh token cookie.  

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `new_username` | `string` | Required, must be different from current username |

**Authentication:** Required (access token + refresh token cookie).  

---

### Delete my account
\`\`\`http
DELETE /api/users/me
\`\`\`
**Description:**  
Delete the authenticated user’s account. Clears associated refresh token cookie.  

**Authentication:** Required (access token).  






### under developement routes

### Get Vocabulary (Need Authentication/Authorization)
```http
  GET /api/vocabulary
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


