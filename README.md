### [Link to Server Repository](https://github.com/andrewbantly/leasepeek-server)
### Objective
The frontend of the application is designed to enable authorized users to upload rent roll data via Excel files (.xlsx), view a history of their uploads with preliminary data visualizations, and access detailed reports on individual properties by selecting a specific upload. Additionally, the system should automatically redirect users who are not logged in or registered to the appropriate authentication page. 

### Programming language: TypeScript
**Rationale:** Our choice of TypeScript in our React application stems from its ability to enforce type safety, significantly reducing type-related bugs common in JavaScript. This is crucial for our data-centric application, ensuring data integrity and boosting development efficiency. TypeScript's proactive error detection, even in a non-large-scale app like ours, leads to a more robust, reliable application and a smoother development process.

### Framework: React
**Rationale:** React offers a robust ecosystemthat includes powerful external libraries such as Chakra UI, which ensures consistent and aesthetically pleasing interfaces, and Apex Charts, which provides comprehensive data visualization. This ecosystem significantly enhances development efficiency and flexibility. The libraries not only expedite the development process but also augment the user experience by making complex data comprehensible and interactive. Moreover, React’s component-based architecture encourages reusable code, further streamlining frontend development.

## User Stories

1. As a user, I want to see a dashboard of information when I login
2. As a user I want to sort my units by preformance or upload date
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