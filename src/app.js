import db from "./models/index.js"

console.log(await db.User.findOne({where:{username: "bhaskar"}}))