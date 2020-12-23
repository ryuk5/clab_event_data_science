const express = require('express');
const router = express.Router();
const User = require('../../models/User');
let dotenv = require('dotenv').config({ path: '../../.env' });

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


router.post('/', (req, res) => {
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
    const { name, email } = req.body; //deconstructring
    
    /* simple validation */
    if (!name || !email) {
        //status 400 stands for a bad request it means that the user didn't send the correct
        //info to get the correct response
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({
        email
    })
        .then(user => {
            // Checing if the user already registred
            if(user) return res.status(400).json({ msg: 'User already exists' })

            // Register new user
            const newUser = new User({
                name,
                email 
            });

            
            newUser.save()
                .then(user => {
                    
                    let transporter = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASS
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                   }));

                    // send mail with defined transport object
                    const mailOptions = {
                        from: process.env.USER, // sender address
                        to: `${email}`, // list of receivers
                        subject: "Data Science Event", // Subject line
                        text: "Registration done successfully", // plain text body
                    }
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.status(200).json({ success: true })
                        }
                   });
                    
                })
                .catch(err => res.status(500).json({ msg: 'Error Occured while registering the user' }))

        })
        .catch(err => res.status(500).json({ msg: 'Error Occured While Fetching The Email' }))


})



module.exports = router;