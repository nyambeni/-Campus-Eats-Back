const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isOwner = req.body.isOwner;

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(existingUser) {
            res.json({
                success: false,
                message: 'An account with that email already is exists'
            });
        } else {
            user.save();

            var token = jwt.sign(
                {
                user: user
            },
            config.secret,
            { expiresIn: '7d'
        });

        res.json({
            success: true,  
            message: 'token is in use',
            token = token
        })
        }
    });
});


router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err)
        throw err;

        if(!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User NOT FOUND!'
            });
        }
        else if(user) {
            var validPassword = user.comparePassword(req.body.password);

            if(!validPassword) {
                res.json({
                    success: true,
                    message: 'Authentication failed. Incorrect password!'
                });
            }
            else {
                var token = jwt.sign(
                    {
                    user: user
                },
                config.secret,
                { expiresIn: '7d'
            });
            res.json({
                success: true,
                message: 'token is in use'

                });
            }
        }

    });
});
    
module.exports = router;