const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register =require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'robofriends'
    }
  });

// db.select('*').from('users')
//   .then(data => {
//       console.log(data)
//   })

const app = express();
// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=> {
    console.log('AllRight!!!')
})

app.post('/signin', (req,res) => {signin.handleSigin(req,res,db,bcrypt,saltRounds)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt,saltRounds)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)}) 

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(3001, ()=>{
    console.log('App is running on port 3001') 
 })
