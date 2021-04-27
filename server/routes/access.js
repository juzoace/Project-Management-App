const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.post('/register', async (req, res, next ) => { 

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
//     if (usernameRetrieved) {
//            console.log('here')
//         res.status(491).json({
//            type: "Error", 
//            msg: "Username taken, try a different username "
//        })
//    } 
//    if (usernameRetrieved) return

   if (emailRetrieved) {
             
    res.status(491).json({
        type: "Error", 
        msg: " Email taken, try a different email"

    })
} if (emailRetrieved) return 

// if (nameRetrieved && usernameRetrieved) {
//     // Tell the user to check the name and username input fields
    
//     res.status(491).json({
//         type: "Error",
//         msg: "Change your name and username`"
//     })
// }

// if (nameRetrieved && usernameRetrieved) return

if (nameRetrieved && emailRetrieved) {
    // Tell the user to check the name and email input fields
    res.status(491).json({
        type: "Error",
        msg: "Change your Name and Email"
    })
}
if (nameRetrieved && emailRetrieved) return

// if (usernameRetrieved && emailRetrieved) {
//     // Tell the user to check the username and email input fields
//     res.status(491).json({
//         type: "Error",
//         msg: "Change your Username and Email"
//     })
// }
// if (usernameRetrieved && emailRetrieved) return

// if (nameRetrieved && usernameRetrieved && emailRetrieved) {
//     // Tell the user to check the name, username and email input fields
//     res.status(491).json({
//         type: "Error",
//         msg: "Change your Name, Username and Email" 
//     })
// };
// if (nameRetrieved && usernameRetrieved && emailRetrieved) return

if (!nameRetrieved && !emailRetrieved) {
    // Everything is, unique proceed to create new user

    //   Generate hash and salt from the password
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;

    const hash = saltHash.hash;

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
    }

    const newUser = new User({
        name: req.body.name,
        // username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt,
        confirmationCode: token
    });

    newUser.save()
    .then((user) => {
   
        // Send Email if you want to expand code
    })

}

});

router.post('/login', async (req, res, next ) => {

    User.findOne({ name: req.body.name})
        .then((user) => {
            if(!user) {
                res.status(401).json({ success: false, msg: "Could not find user" })
            }

            // if (user.status != "Active") {
                  
                // return res.status(401).send({
                //     msg: "Kindly verify your account. Click the activation link that was sent to your email  !",
                //   });

            // } else {


            const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

            if(isValid) { 
                const tokenObject = utils.issueJWT(user);
                
                res.status(200).json({ success: true, msg: "Login Successful", user: user, token: tokenObject.token, expiresIn: "3600"})
            
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