const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult } = require('express-validator');
require('dotenv').config({ path: './config.env' })

exports.login = async(req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    let {username,password} = req.body;
    username = username.toLowerCase()
    try {
        let user = await User.findOne({
            where:{
              username
            }
          })
          if(!user){
            return res.status(400).json({ errors: [{ msg: 'Username or password doesnt match' }] });
           }
        const comparePassword = await bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
          res.status(400).send({ errors: [{ msg: "Username or password doesnt match" }]});
        }
        const payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(
            payload,
            ""+process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }

}

exports.signup = async(req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    let {username,password,confirm_password} = req.body;
        
    username = username.toLowerCase();
    
    if(password !== confirm_password){
      return  res.status(400).json({ errors: [{ msg: 'Confirmed password didnt match or is empty' }] })
      }


    try {

    let user = await User.findOne({
        where:{
          username:username
        }
      })
      if(user){
       return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
      }
    
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    
    password = hash;

    user = await User.create({
        username,
        password

      });

      const payload = {
        user: {
          id: user.id
        }
      };
      // console.log((process.env.jwtSecret).length)

      jwt.sign(
        payload,
        ""+process.env.jwtSecret,
        {
          expiresIn: 36000
        },
        async (err, token) => {
          if (err) throw err;
         
          res.json({ token });
        }
      );
   } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
   }
}

exports.loadUser = async (req,res,next) =>{
    try {
      const user = await User.findByPk(req.user.id,
        {
          attributes:['id','username']
        })
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }