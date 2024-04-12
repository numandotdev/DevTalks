import bcrypt from "bcrypt";

export const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const decryptPassword = (password, encryptPassword) => {
    return bcrypt.compare(password, encryptPassword);
}