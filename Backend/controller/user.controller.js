const UserModel = require('../model/userMaster.model');

async function getUser() {
    try {
        let UserData = await UserModel.find({})
        console.log(UserData)
        return UserData
    } catch (error) {
        console.log(error)
    }
}

// async function addUser(data) {
//     try {
//         let User = new UserModel(data)
//         let UserData = await User.save(data)
//         console.log(UserData)
//         return UserData
//     } catch (error) {
//         console.log(error)
//     }
// }

async function updateUser(CatId, user) {
    try {
        let response = await UserModel.updateOne({ _id: CatId }, user )
        return response
    } catch (error) {
        console.log(error)
    }
}

async function deleteUser(catId) {
    try {
        let res = await UserModel.remove({ _id: catId })
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUser,
    // addUser,
    updateUser,
    deleteUser
}