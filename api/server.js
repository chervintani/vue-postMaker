'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//models
const schema = require('./Note');


mongoose.connect(
  'mongodb://localhost:27017/simple_blog',
  { useNewUrlParser: true, useCreateIndex: true, }
);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/note/list', (req, res) => {
  schema.Note.find({}).sort({ updatedAt: 'descending' }).exec((err, notes) => {
    if (err)
      return res.status(404).send('Error while getting notes!');
    return res.send({ notes });
  });
});

app.post('/api/note/create', (req, res) => {
  const note = new schema.Note({ body: req.body.body, title: req.body.title });
  note.save((err) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ note });
  });
});


app.post('/api/note/update/:id', (req, res) => {
  schema.Note.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, note) => {
    if (err) return res.status(404).send({ message: err.message });
    return res.send({ message: 'note updated!', note });
  });
});

app.post('/api/note/delete/:id', (req, res) => {
  console.log(req.params.id)
    schema.Note.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(404).send({ message: err.message });
      return res.send({ message: 'note deleted!' });
    });
});


const PORT = 5000;

app.listen(PORT);
console.log('Server is running on port ' + PORT + ': ');