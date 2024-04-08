const bcrypt=require("bcrypt");
const { PASSWORD_HASH_SALT, JWT_SECRET, JWT_EXPIRY } = require("../config/constants");
const { registerUserValidator, loginUserValidator } = require("../validators/auth.validator");
const userContext=require("../db/context/auth.context")
const jwt=require("jsonwebtoken")
const registerUserController=async(req,res)=>{
    try {
        const {isValid,params,errorMessage}=registerUserValidator(req.body)
        if(!isValid){
           return res.status(400).json({ error: "Validation Error", errorDescription: errorMessage });
        }
        const isUserAvailable = await userContext.getUserByEmail(params.email);
        if(isUserAvailable){
           return res.status(422).json({error: "Already registered", errorDescription: "Given email is already registered"})
        }
        const hashedPassword = await bcrypt.hash(params.password, PASSWORD_HASH_SALT);
        const newUserObj={
           name:params.name,
           email:params.email,
           password:hashedPassword,
        }
        const newUser=await userContext.createNewUser(newUserObj)
        return res.status(201).json({ message: "Registration successful", newUser });
     } catch (error) {
        console.error("Registration Error", error);
        return res.status(500).json({ error: "Internal server error", errorDescription: error.message });
     }
}
const loginUserController=async(req,res)=>{
    try {
        const {isValid,params,errorMessage}=loginUserValidator(req.body)
        if(!isValid){
           return res.status(400).json({ error: "Validation Error", errorDescription: errorMessage });
        }
        const user = await userContext.getUserByEmail(params.email);
        if(!user){
           return res.status(422).json({error: "User Not Found", errorDescription: "Please Register First"})
        }
        const isPasswordValid = await bcrypt.compare(params.password, user.password);
        if (!isPasswordValid) {
        return res.status(422).json({ error: "Invalid email/password", errorDescription: "Given email/password is invalid or not registered" });
        }
        const token = jwt.sign({ id: user.id, email: user.email, }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
        return res.status(200).json({ message: "Login Successful", token });
     } catch (error) {
        console.error("Registration Error", error);
        return res.status(500).json({ error: "Internal server error", errorDescription: error.message });
     }
}

module.exports={registerUserController,loginUserController}