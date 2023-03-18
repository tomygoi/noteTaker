const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

