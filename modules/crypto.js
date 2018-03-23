var CryptoJS = require("crypto-js");
const pl = require('pinklog')

const crypt = {}

const check = (message, password) => {
    let last = message.substr(message.length - password.length)
//    pl.log('----check----')
//    pl.log(message)
//    pl.log(last)

    return (password == last) ? true : false
}

module.exports = (secret) => {
    crypt.encode = (message, password) => {
        let passone = CryptoJS.AES.encrypt(message, password).toString()
        return CryptoJS.AES.encrypt(passone + password, secret).toString()
    }

    crypt.decode = (message, password) => {
        let passone = CryptoJS.AES.decrypt(message, secret).toString(CryptoJS.enc.Utf8)
        return check(passone, password) ? CryptoJS.AES.decrypt(passone.substr(0, passone.length - password.length), password).toString(CryptoJS.enc.Utf8) : 'not valid'
    }
    crypt.passcheck = (message, password) => {
        let passone = CryptoJS.AES.decrypt(message, secret).toString(CryptoJS.enc.Utf8)
        return check(passone, password) ? true : false
    }

    return crypt
}
