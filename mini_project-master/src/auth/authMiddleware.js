const User = require('./auth')

function findemail (req, res, next){
    User.find({ email: req.body.email })//string
    .exec() // return a promise
    .then(user => {
      if (user.length > 0) {
        return res.json('This email is already taken')
      }
      next()
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports = findemail