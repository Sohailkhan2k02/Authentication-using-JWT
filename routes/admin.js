const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course }=require("../db")
const router = Router();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    Admin.create({
        username:username,
        password:password,
    })
    res.json({
        msg: "Admin created successfully"
    })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title: title,
        description: description,
        imagelink: imagelink,
        price: price,
    });
    res.json({
        msg: "Course created successfully",
        CourseId: newCourse._id,
    });
});


router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const response=await Course.find({});
    res.json({
        Courses:response
    })
});

module.exports = router;