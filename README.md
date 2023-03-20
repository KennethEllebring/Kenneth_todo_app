# ToDo app in react, with express server and mySQL

## Getting started

Install all dependencies by typing in terminal:

```
--> npm install <--
```

You also need to add a ".env" file in the root directory of the program with the following info:

```
DB_HOST = ""
DB_USERNAME = ""
DB_PASSWORD = ""
DB_DATABASE = ""

# set your database info inside of the quotes ""
```

Start the server by typing in terminal:

```
--> npm run server <--
starting server on (PORT-5000) as standard(can be changed to other port in the file "server.js")
```

Start the app, open a new terminal window and type:

```
--> npm start <--
starting application on "localhost:3000" as standard
```

Also, don't forget to start your mySQL database

## Using App

Start using the app by going to localhost:3000, if it not started automatically in your browser.

### Login

The starting page is a Login form that requires a username and a password, start by clicking "Register new account" and choose a username and password, those are saved in the database with hashed password.

You are automatically navigated back to the login form when done with registration so just add your credentials and press login.

### Todos

Now you are logged in and are able to use the Todo app, if you haven't got any todos yet, just add a new one by pressing "Add todo", type what you need to do and press save.

Now you will see this todo at your "Home" page, and you are able to edit it or delete it, if its done.

### Friends

You also have support for adding friends that also are registered at the app, so just click "Friendlist" and "Add friend" if you aint got any friends in your friend list, if you want to check their Todo list, just click "todo" by the name of your friend.

---

Made with React by Kenneth Ellebring
