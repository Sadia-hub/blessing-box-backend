const addUser = (req, res, next) =>{
    res.json({msg:"Add User"})
}

const updateUser = (req, res, next) =>{
    res.json({msg:"Update User"})
}

const deleteUser = (req, res, next) =>{
    res.json({msg:"delete user"})
}

const getUser = (req, res, next) =>{
    res.json({msg:"Get user"})
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUser
}

