const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'postgres',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'facerecognition'
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send(database.users.map(user => censorUser(user)));
});

app.post('/signin', (req, res) => {
    const {email, password } = req.body;
    console.log("Received signin request: ", JSON.stringify(req.body));
    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(user => {
            if (!(user && user.length)) {
                console.log('Wrong credentials - no such email: ', email);
                res.status(400).json('Wrong credentials');
                return;
            }

            const isValid = bcrypt.compareSync(password, user[0].hash);
            if (!isValid) {
                console.log('Wrong credentials');
                res.status(400).json('Wrong credentials');
                return;
            }

            console.log('Singin request ', JSON.stringify(req.body), ". Response: Success");
            db.select('*').from('users').where('email', '=', email)
                .then(user => res.json(user[0]))
                .catch(err => {
                    console.log('Error getting user from DB: ', err);
                    res.status(400).json('Error getting user');
                });
        })
        .catch(err => {
            console.log("Error retrieving data from DB. Wrong credentials? Details: ", err);
            res.status(400).json('Wrong credentials');
        });
});

app.post('/register', (req, res) => {
    const {email, name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.transaction(trx => {
        return trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmailArr => {
            return trx('users').returning('*').insert({
                name: name,
                email: loginEmailArr[0],
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => {
        console.log('Unable to register: ', err);
        res.status(400).json("Unable to register")}
    );
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(users => {
            if (users.length) {
                res.json(users[0]);
            } else {
                res.status(400).json("Not found");
            }
        }).catch(err => {
            res.status(400).json("Error getting user");
        });
 });

 app.put('/image', (req, res) => {
    const { id } = req.body;

    db('users')
        .where({id})
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries))
        .catch(err => {
            console.log("Error while updating entries for id ", id, ": ", err);
            res.status(400).json("Error updating entries");
        });
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
