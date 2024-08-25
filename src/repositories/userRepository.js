const { User } = require('../schema/userSchema');

async function findUser(parameters) {
    try {
        // const response1 = await User.findOne({email : "aniketbedre9888@gmail.com"})
        // console.log(response1)
        const response = await User.findOne({...parameters});
        // console.log("reponse :", response)
        return response;
    } catch(error) {
        console.log(error);
    }
} 

async function createUser(userDetails) {
    try {
        const response = await User.create(userDetails);
        return response;
    } catch(error) {
        console.log(error);
    }
    
}

module.exports = {
    findUser,
    createUser
};

// data base interaction layer that repository layer