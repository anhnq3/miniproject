const User = require('./auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// Login
const Login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if (!user) {
        return res.json('Invalid email')
    }
    try {
        const check = await bcrypt.compare(password, user.password)

        if (check) {
            var admin
            user.status == "admin" ?
                admin = true : admin = false
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                    admin: admin
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).json({
                message: "Auth successful",
                token: token,
                admin: admin
            });
        }

        res.json('Invalid password')
    }
    catch (err) {
        console.log(err)
        res.json('Auth failed')
    }

}

// Update
const Update = async (req, res) => {
    try {
        const id = req.params.id
        const updates = { ...req.body, 'updateAt': new Date }
        const options = { new: true }

        const result = await User.findByIdAndUpdate(id, updates, options)
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }

}

// Delete
const Delete = async (req, res) => {
    const id = req.params.id
    try {
        const result = await User.findByIdAndDelete(id)
        return result == null ? res.send('User not found') : res.send('Deleted')

        // Delete all Useralbum with deleted id user
    } catch (err) {
        res.send(err)
    }
}

// All user
const Alluser = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        res.send('Error in login: ', err)
    }
}

// Register
const Register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log('salt: ', salt)
        console.log('hashedPassword: ', hashedPassword)

        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            createAt: new Date(),
            updateAt: new Date(),
            status: req.body.status
        })

        const regisUser = await user.save()
        res.send(`Account have been registed: ${regisUser}`)
    }
    catch (err) {
        console.log(err)
        res.send('Save user failed')
    }

}

// Forgot password
const Forgot = async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anhnq3@vmodev.com',
            pass: '123456',
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const data = req.body
    try {
        const value = await passwordValidate.validateAsync(data)//Joi
        const { email, newPassword } = value
        await users.findOne({ where: { email: email } }).then(async (user) => {
            //Send verification mail to user
            var mailOption = {
                from: '"Verify your email" <anhnq3@vmodev.com>',
                to: user.email,
                subject: 'AnhNQ -Create new password',
                html: `<h2> ${user.name}! Create new password </h2>
                    <a href='http://${req.headers.host}/verify-account?email=${user.email}&newPass=${newPassword}'>Create new password</a>`,
            }

            //Sending mail
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Message is sent your gmail account')
                }
            })
            res.status(200).send(user)
        })
    } catch (error) {
        res.status(400).send(error.details[0].message)
    }
}

module.exports = {
    Login,
    Update,
    Delete,
    Alluser,
    Register,
    Forgot
}
