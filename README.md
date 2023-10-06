### Objective
The frontend of this application should allow a user signup  to upload an excel file (such as .xlsx), click on previous data uploads, and visualize data. It should also reroute a user who is not logged in / signed up. 

### Programming language: TypeScript
### Framework: React

## User Stories

1. As a user, I want to see a dashboard of information when I login
2. As a user I want to sort my units by preformance 
3. As a user I want to click into a profile of a unit and see unit information

## Routing
| HTTP METHOD | URL                     | CRUD    | Description                                                       | View                   |     |     |     |
|:----------- |:----------------------- |:------- |:----------------------------------------------------------------- |:---------------------- | --- | --- | --- |
| GET         | /                       | READ    | Load homepage with login form                                     | Home / User login      |     |     |     |
|             |                         |         |                                                                   |                        |     |     |     |
| POST        | /login                  | READ    | Checks user credentials against database                          |                        |     |     |     |
| GET         | /new                    | READ    | Display signup form                                               | Member signup form     |     |     |     |
| POST        | /join                   | CREATE  | Add member to database, redirect to members/:username/todayspicks |                        |     |     |     |
|             |                         |         |                                                                   |                        |     |     |     |
| GET         | /:userName/profile      | READ    | Load private user's rent roll upload history for quick access     | Profile                |     |     |     |
| POST        | /:userName/upload       | CREATE  | Upload rent roll data, redirected to /:userName/:uploadId         |                        |     |     |     |
| DELETE      | /:userName/:uploadId    | DESTROY | Removes rent roll upload from database                            |                        |     |     |     |
|             |                         |         |                                                                   |                        |     |     |     |
| GET         | /:userName/:uploadId    | READ    | Display rent roll data visualizations                             | Rent Roll Data Visuals |     |     |     |