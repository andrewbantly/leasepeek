### Objective
The frontend of this application should allow a user signup  to upload an excel file (such as .xlsx), click on previous data uploads, and visualize data. It should also reroute a user who is not logged in / signed up. 

### Programming language: TypeScript
### Framework: React

## User Stories

1. As a user, I want to see a dashboard of information when I login
2. As a user I want to sort my units by preformance 
3. As a user I want to click into a profile of a unit and see unit information

## Routing
| HTTP METHOD | URL             | CRUD    | Description                                                                         | View             |
|:----------- |:--------------- |:------- |:----------------------------------------------------------------------------------- |:---------------- |
| GET         | /               | READ    | If user not logged in, load homepage with LeasePeek background information          | Home             |
|             |                 |         |                                                                                     |                  |
| GET         | /login          | READ    | Load user login form                                                                | User login form  |
| POST        | /login          | CREATE  | Checks user credentials against database, returns JWT                               |                  |
| GET         | /register       | READ    | Display signup form                                                                 | User signup form |
| POST        | /register       | CREATE  | Add user to database, redirect to '/'                                               |                  |
|             |                 |         |                                                                                     |                  |
| GET         | /               | READ    | If user is logged in, load private user's rent roll upload history for quick access | Profile          |
| POST        | /data/upload    | CREATE  | Upload rent roll data, redirected to profile page                                   |                  |
| GET         | /data/:objectId | READ    | Detailed report of rent roll upload with data visualizations                        | Property Profile |
| DELETE      | /data/delete    | DESTROY | Removes rent roll upload from database, MongoDB ID sent as parameter                |                  |