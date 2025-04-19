require('dotenv').config()

const PASSWORD = process.env.PASSWORD
const encodedPassword = encodeURIComponent(PASSWORD)
console.log("[] password encoded", encodedPassword);
