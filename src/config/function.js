/* This all of are helper function */

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true
    } else {
        return false
    }
}

const emailCheckInDatabase = async (email) => {
    // let user = await userModel.findOne({ email: email })
    // user.exec((err, data) => {
    //     if (!data) {
    //         return false
    //     } else {
    //         return true
    //     }
    // })
}

const phoneNumberCheckInDatabase = async (phoneNumber) => {
    // let user = await userModel.findOne({ phoneNumber: phoneNumber })
    // user.exec((err, data) => {
    //     if (data) {
    //         return true
    //     } else {
    //         return false
    //     }
    // })
}

module.exports = {
    toTitleCase,
    validateEmail,
    emailCheckInDatabase,
    phoneNumberCheckInDatabase,
}
