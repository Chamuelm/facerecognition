const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const salt = bcrypt.genSaltSync(10);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Moshe',
            email: 'chamuelm@gmail.com',
            password: bcrypt.hashSync('cookies', salt),
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: bcrypt.hashSync('bananas', salt),
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
   res.send(database.users.map(user => censorUser(user)));
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
            bcrypt.compareSync(req.body.password, database.users[0].password)) {
        console.log("Received signin request: ", req.body, " Response: Success");
        res.json(censorUser(database.users[0]));
    } else {
        console.log("Received signin request: ", req.body, " Response: Fail");
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const {email, name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    database.users.push({
            id: '125',
            name: name,
            email: email,
            password: hash,
            entries: 0,
            joined: new Date()
    });
    res.json(censorUser(database.users[database.users.length-1]));
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            res.json(censorUser(user));
            found = true;
        }
    })

    if (!found) {
        res.json("No such user");
    }
 });

 app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            res.json(user.entries);
            found = true;
        }
    })

    if (!found) {
        res.json("No such user");
    }
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});

const censorUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
    }
}