const router = require('express').Router();
const mongoose = require('mongoose');
// const Project = mongoose.model('Project');
const passport = require('passport');
const utils = require('../lib/utils');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const jsonwebtoken = require('jsonwebtoken');


router.get('/fetchProjects', passport.authenticate('jwt', {session: false}), async(req, res, next ) => {
    console.log(req.headers.authorization)
    // console.log(req.body);
    await User.findById(req.body._id).populate("projects")
    .then((project) => {
        console.log(project.projects)
        res.status(200).json({success: true, data: project.projects})
    })
    .catch((err) => {
        res.status(401).json({success: false, msg: err})
    })
    // console.log(project.projects);
   


    

})

router.post('/createProject', passport.authenticate('jwt', {session: false}), async(req, res, next ) => {
    console.log(req.body);
    let userId = await User.findById(req.body._id)
    // console.log(projects
    // .then((user) => {

    //     console.log(user)
    //     // foundUser = user
    // })

    console.log(userId._id);
    console.log(req.body.title)
    if (userId !== undefined ) {
        const newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.description,
            budget: req.body.budget,
            owner: userId._id
        })


        await newProject.save()
        console.log(userId)
        userId.projects.push(newProject);
        await userId.save();
        // .then((project) => {
        //     console.log(project)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }


    // console.log(foundUser)

});
    
router.post('/updateProject', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    

    // get particular project _id
    console.log(req.body)
    await Project.findOneAndUpdate( {_id: req.body._id}, {
        title : req.body.title,
        description : req.body.description,
        deadline : req.body.deadline,
        budget : req.body.budget,
        status : req.body.status
    }, { useFindAndModify: false })
    .then((project) => {
        console.log(project);
    })


    // await Project.findById(req.body._id)
    // .then(project => {
        // project.title = req.body.title;
        // project.description = req.body.description;
        // project.deadline = req.body.deadline;
        // project.budget = req.body.budget;
        // project.status = req.body.status;
    //     project.save();
    // })
    // .then(() => {
    //     res.status().json({success: true})
    // })
})

router.post('/delete', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    
})

module.exports = router;