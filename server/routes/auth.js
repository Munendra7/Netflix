const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const { prisma } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',[
    check('email','Please input a valid email').isEmail(),
    check('password', 'Please input a password with min length 6').isLength({min: 6}),
    check('username', 'Please input a username').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
 
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password, username } = req.body;

    const user = await prisma.UserDetails.findUnique({
        where: {
            email: email
        }
    });

    if(user)
    {
        return res.status(400).json({errors:[{message: 'User already exists'}]});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.UserDetails.create({
        data: {
            email:email,
            password:hashedPassword,
            username:username
        },
        select: {
            id: true,
            email: true,
            username: true
        }
    });

    const token = await jwt.sign(newUser, process.env.JWT_SECRET, {expiresIn: 3600000});

    res.json(token);
});

router.post('/login',async(req,res) => {    

    const { email, password } = req.body;

    const user = await prisma.UserDetails.findUnique({
        where: {
            email: email
        }
    });

    if(!user)
    {
        return res.status(401).json({errors:[{message: 'Invalid credentials'}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
    {
        return res.status(401).json({errors:[{message: 'Invalid credentials'}]});
    }

    const token = await jwt.sign({id:user.id, email:user.email, username:user.username}, process.env.JWT_SECRET, {expiresIn: 3600000});

    const userPayload = { 
        id: user.id,
        email: user.email,
        username: user.username
    };

    res.json({token , user: userPayload});

});

router.get('/me', async (req, res) => {

   const bearerToken = req.header('Authorization');
   if(!bearerToken)
   {
       return res.status(401).json({message: 'No token, authorization denied'});
   }
   const token = bearerToken.split(' ')[1];
   if(!token)
   {
       return res.status(401).json({message: 'No token, authorization denied'});
   }
   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
       if(err)
       {
           return res.status(401).json({message: 'Token is not valid'});
       }
       const user = await prisma.UserDetails.findUnique({
           where: {
               id: decoded.id
           },
           select: {
               id: true,
               email: true,
               username: true
           }
       });
       res.json({user:user});
   });
});

module.exports = router;