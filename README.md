# [ ASSIGNMENT STATUS IN PROGRESS ● ● ●]
 
 [![Maintainability](https://api.codeclimate.com/v1/badges/08d9a491857b1935000e/maintainability)](https://codeclimate.com/github/key-joshua/neotechsolutions-backend-assignment/maintainability)
[![CircleCI](https://circleci.com/gh/key-joshua/neotechsolutions-backend-assignment/tree/develop.svg?style=svg)](https://circleci.com/gh/key-joshua/neotechsolutions-backend-assignment/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/key-joshua/neotechsolutions-backend-assignment/badge.svg?branch=develop)](https://coveralls.io/github/key-joshua/neotechsolutions-backend-assignment?branch=develop)
[![codecov](https://codecov.io/gh/key-joshua/neotechsolutions-backend-assignment/branch/develop/graph/badge.svg?token=7ZU0CSQJQD)](https://codecov.io/gh/key-joshua/neotechsolutions-backend-assignment)

# BACKEND ASSIGNMENT - NEOTECH SOLUTIONS

Assignment for creating a small server application with Node.js by assignment purpose
#### This is the Hosted link of the backend challenge [Access endpoint Direct]

https://neotechsolutions-backend.herokuapp.com

#### This is the Github repository link of the frontend challenge 

https://github.com/key-joshua/neotechsolutions-backend-assignment


<br>

## Features

- Create an employee.
- delete an employee.
- update an employee.
- view all employees.
- view deleted employees.

## Test Ksdacllp APIs

Before we get started Remember to take  :coffee:   :pizza:  and :dancer:  When You Are coding, come on Dude it all about relax
### Backend tools

 - All Neccessary libraries.
 - Express JS.
 - NodeJs.

#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION

- Version API using URL versioning starting with https://neotechsolutions-backend.herokuapp.com/api/path  


|NO  | VERBS  | ENDPOINTS                                  | STATUS       | ACCESS      | DESCRIPTION                                |
|----|--------|--------------------------------------------|--------------|-------------|--------------------------------------------|
| 1  | POST   | /api/employees/create-employee             | 201 CREATED  | public      | create an employee with employee details   |
| 2  | DELETE | /api/employees/delete-employee/employeeId  | 200 OK       | public      | delete an employee by employee id          |


#### Other Tools

Other tools and technologies used in development of this application are;
- Hosting: [Heroku](https://heroku.com/).
- Compiler: [Babel](https://babeljs.io/).
- Style Guide: [Airbnb](https://airbnb.io/projects/javascript/).
- Framework: [ExpressJS](http://expressjs.com/).
- Documentation: [Swagger](https://swagger.io/).
- Linting Library: [ESLint](https://eslint.org/).
- API Testing environment: [Postman](https://www.getpostman.com).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- Text Editor: [VSCode](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com/).

## GETTING TEST WITH PROJECT GLOBALLY

- [API Swagger Documentation](https://neotechsolutions-backend.herokuapp.com/api/v1/documentation)

## GETTING TEST WITH PROJECT LOCALLY

- Open your Gitbash/cmd and run command below to Clone repository into your local machine:
```
git clone https://github.com/key-joshua/neotechsolutions-backend-assignment.git
```

- Run command below to dive into cloned repository in your local machine:
```
cd neotechsolutions-backend-assignment
```

- Install the required dependencies found in package.json by running this command:
```
npm install
```

- And then to start running  this project on your machine , run this command:
```
npm run server
 ```

- then to run test, run this commands:
```
npm run kill
```
```
- npm run test
```