const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const bodyParser = require('body-parser')
const db = require('../db')
const brcrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.use(bodyParser.json())

function verifyToken(req, res, next) {
  if(!req.headers.authorization) 
    return res.status(401).send("Unathorized Request")

  let token = req.headers.authorization.split(' ')[1];

  if(!token)
    return res.status(401).send("Unathorized Request")
  
  let payload = jwt.verify(token, "secretKeyOnServer")

  if(!payload) 
    return res.status(401).send("Unathorized Request")
  next()
}

router.get('/', (req, res) => {
    return res.send(`<<<---------Express Server UP on ${process.env.EXPRESS_PORT}--------->>>`)
})

router.post('/register', async (req, res)=> {
    let email = req.body.email
    let password = req.body.password

    let ifEmailExists = await userModel.findOne({email}).then((data)=> {return data;})

    if(ifEmailExists)
      return res.status(400).send({"error": "User already Exists !"})

    let encryptedPassword = await brcrpt.hash(password, 10);

    let user = new userModel({email, "password": encryptedPassword});

    user.save((err, registeredUser)=> {
        if(err)
          return res.status(400).send(err);
        else if(registeredUser) {
          let payload = { "email": user.email }
          let token = jwt.sign(payload, 'secretKeyOnServer')
          return res.status(200).send({token});
        }
    })
})

router.post('/login', async (req, res)=> {
    let {email, password} = req.body

    const user = await userModel.findOne({email})
    if(user) {
        await brcrpt.compare(password, user.password, (err, result) => {
          if(result) {
            let payload = { "email": user.email }
            let token = jwt.sign(payload, 'secretKeyOnServer')
            return res.status(200).send({token});
        }
          else
            return res.status(400).send({"error": "Invalid Credentials"});
          })
    }   
    else {
      return res.status(400).send({"error": "User doesn't exists"});
    }
})

router.get('/events', async(req, res)=> {
    let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "7",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "8",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "9",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }]

    return res.send(events)
})


router.get('/specials', verifyToken, async(req, res)=> {
    let specials = [
    {
      "_id": "111",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "222",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "333",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },]

    return res.send(specials)
})

module.exports = router