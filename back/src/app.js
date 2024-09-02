const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload')

const cors = require('cors');
const imagemRouter = require('./routes/imagemRouter');
const UsuarioRouter = require('./routes/UsuarioRouter');
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());

app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', imagemRouter);
app.use('/api', UsuarioRouter);


module.exports = app;