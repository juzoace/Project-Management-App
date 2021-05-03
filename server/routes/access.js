const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.post('/register', async (req, res, next ) => { 

    console.log(req.body)
    // Name database check
    const nameRetrieved = await User.findOne({ name: req.body.name });
        
    // Email database check
    const emailRetrieved = await User.findOne({ email: req.body.email }) 

    if (nameRetrieved) {
        // Send a response to the user to use a different name

        res.status(491).json({
         type: "Error",
         msg: "Name taken, try a diffferent name"
     })
     if (nameRetrieved) return
    } 
    console.log('here')


   if (emailRetrieved) {
             
    res.status(491).json({
        type: "Error", 
        msg: " Email taken, try a different email"

    })
} if (emailRetrieved) return 



if (nameRetrieved && emailRetrieved) {
    // Tell the user to check the name and email input fields
    res.status(491).json({
        type: "Error",
        msg: "Change your Name and Email"
    })
}
if (nameRetrieved && emailRetrieved) return

if (!nameRetrieved && !emailRetrieved) {
    // Everything is, unique proceed to create new user
    console.log("unique")
    //   Generate hash and salt from the password
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;

    const hash = saltHash.hash;

    const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        hash: hash,
        salt: salt
        // confirmationCode: token
    });

    console.log(newUser)
    await newUser.save()
    
    .then((user) => {
        console.log(user)
        console.log('hey')
        // Send Email if you want to expand code
        res.status(200).json({ success: true, user: user, msg: "User was registered successfully! "})
    })
    .catch((error) => {
        
        res.status(401).json({ success: false, msg: "Something went wrong"})

    })

}

});

router.post('/login', async (req, res, next ) => {

    User.findOne({ email: req.body.email})
        .then((user) => {
            console.log(user)
            if(!user) {
                res.status(401).json({ success: false, msg: "Could not find user" })
            }


            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

            if(isValid) { 
                const tokenObject = utils.issueJWT(user);
                
                res.status(200).json({ success: true, msg: "Successful", user: user, token: tokenObject.token, expiresIn: "3600"})
            
            } else {
            

                res.status(401).json({ success: false, msg: "You entered the wrong password"})

            }
            // }
        })
        .catch((err) => {
            next(err);
        });
});
module.exports = router;