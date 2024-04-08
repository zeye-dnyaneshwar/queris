const Users = require("../../models/User.model")

const getUserByEmail=async(email)=>{
    const user=await Users.findOne({
        where:{
            email
        }
    })
    return user
}

const createNewUser=async({name,email,password})=>{
    const newUser=await Users.create({
        name,
        email,
        password
    })
    return newUser
}



module.exports={getUserByEmail,createNewUser}