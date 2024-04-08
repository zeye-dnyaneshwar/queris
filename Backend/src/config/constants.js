module.exports={
    PORT:process.env.PORT,
    PASSWORD_HASH_SALT:10,
    JWT_SECRET:process.env.JWT_SECRET_KEY,
    JWT_EXPIRY:'3d'
}