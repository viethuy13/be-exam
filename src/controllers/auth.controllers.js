const login = function (req, res, next) {
    res.status(200).json({ message: 'Login Success' })
}

module.exports = {
    login,
}
