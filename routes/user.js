const { Router } = require("express");
const router = Router();
const { User, Course }=require("../db")
const userMiddleware = require("../middleware/user");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;

    User.create({
        username: username,
        password:password,
    })
    res.json({
        msg:"User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response =await Course.find({});
    res.json({
        courses:response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    await User.updateOne({
        username:username
    },{
        "$push": {
            purchasedCourses:courseId
        }
    })
    res.json({
        msg:"Purchase completed"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user= await User.findOne({
        username:req.headers.username,
    })

    const courses=await Course.find({
        _id: {
            "$in": user.purchasedCourses,
        }
    });
    res.json({
        courses:courses
    })

    
});

module.exports = router