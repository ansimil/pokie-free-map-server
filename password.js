const bcrypt = require('bcryptjs');

const saltRounds = 10;
const password = process.env.PASSWORD
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync(password, salt);



function makePassword() {
    console.log(hashedPassword)
}

makePassword()