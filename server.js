require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { User } = require('./models/user');
const { Exercise } = require('./models/user');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

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
      const adjustedResult = {
        username: result.username,
        _id: result.id,
      }
      res.status(200).json(adjustedResult);
    })
});

app.post('/api/exercise/add', (req, res) => {
  const { body } = req;
  const id = body.userId;
  const exercise = new Exercise({
    description: body.description,
    duration: Number(body.duration),
    date: body.date,
  })
  if(exercise.date === ''){
    exercise.date = 
    new Date()
    .toISOString()
    .slice(0, 10);
  }
  User.findByIdAndUpdate(
      id,
      {$push: { log: exercise }},
      { new: true }
    )
  .then(user => {
    const responseObj = {
      _id: user._id,
      username: user.username,
      date: new Date(exercise.date).toDateString(),
      description: exercise.description,
      duration: exercise.duration,
    }
    res.status(200).json(responseObj);
  })
  .catch(err => {
    console.log(err);
  })
})

app.get('/api/exercise/users', (req, res) => {
    User.find({}).select(['-log', '-__v'])
    .then(users => {
        console.log(users);
        res.status(200).json(users);
    })
})





const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});
