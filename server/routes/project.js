const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const utils = require('../lib/utils');
const Project = mongoose.model('Project');
const User = mongoose.model('User');

router.get('/fetchProjects', passport.authenticate('jwt', {session: false}), async(req, res, next ) => {
    
    // Get the user Id
    await User.findById(req.body._id).populate("projects")
    .then((project) => {
       
         // Send response to client
        res.status(200).json({success: true, data: project.projects})
    })
    .catch((err) => {

         // Send response to client
        res.status(401).json({success: false, msg: err})
    })
    
})

router.post('/createProject', passport.authenticate('jwt', {session: false}), async(req, res, next ) => {

    // Get the user Id
    await User.findById(req.body._id)
    .then((userId) => {
     
        if (userId._id !== null) {
            const newProject = new Project({
                title: req.body.title,
                description: req.body.description,
                deadline: req.body.description,
                budget: req.body.budget,
                owner: userId._id
            })
    

            newProject.save()
            .then((project) => {

                 // Send response to client
                res.status(200).json({success: true, data: project})
        
            })
            .catch((err) => {

                 // Send response to client
                res.status(401).json({success: false, msg: err})
            })

            // must work push new project to the user
            userId.projects.push(newProject);
    
            userId.save()
        }
       
        
    })
    .catch((err) => {
         // Send response to client
        res.status(401).json({success: false, msg: "Something went wrong"})
    })
  
});
    
router.post('/updateProject', passport.authenticate('jwt', {session: false}), async(req, res, next) => {

    // get particular project _id
    await Project.findOneAndUpdate( {_id: req.body._id}, {

        title : req.body.title,
        description : req.body.description,
        deadline : req.body.deadline,
        budget : req.body.budget,
        status : req.body.status

    }, { useFindAndModify: false })
    .then((project) => {


        // Send response to client
        res.status(200).json({success: true, data: project.projects})

    })
    .catch((err) => {

        // Send response to client
        res.status(401).json({success: false, msg: "Something went wrong"})
    
    })

})

router.post('/deleteProject', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    // get particular project _id
    await Project.findByIdAndRemove({_id: req.body._id})
    .then((project) => {
        
        if(project === null) {
        // Send response to client
        res.status(401).json({success: false, msg: "Something went wrong"})
    
        }

        // Send response to client
        res.status(200).json({success: true})

    })
    .catch((err) => {
   
        // Send response to client
        res.status(401).json({success: false, msg: err})
    
    })
        

})

module.exports = router;