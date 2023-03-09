const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const exsitingPass = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && exsitingPass) {
          let returnUser = {...users[i]}
          delete returnUser.passHash
          return res.status(200).send(returnUser)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      
        const { username, password, email, firstName, lastName} = req.body
        let salt = bcrypt.genSaltSync(10)
        let passHash = bcrypt.hashSync(password, salt)
        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }
        console.log('Registering User')
        console.log(passHash);
        console.log(userObj)
        users.push(userObj)
        res.status(200).send(userObj)
    }
}