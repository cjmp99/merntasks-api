const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        let emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ msg: 'There is already a user with this email' })
        }
        let user = new User(req.body)

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save()

        let payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({ token })
        })

    } catch (error) {
        console.log(error);
        res.status(400).send('Something went wrong when trying to create a user!')
    }
}