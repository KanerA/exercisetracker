require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/exercise/new-user', (req, res) => {
    const { body } = req;
    const user = new User({
      username: body.username,
    })
    user.save()
    .then(result => {
      res.status(200).json(result);
    })
});

app.get('/api/exercise/users', (req, res) => {
    User.find()
    .then(users => {
        console.log(users);
        res.status(200).json(users)
    })
})





const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});
