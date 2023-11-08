'use strict'

const express = require('express')
const {
    loginUser,
    registerUser,
    logoutUser,
    registerAdmin,
    loginAdmin,
    logoutAdmin,
} = require('../controllers/auth.controllers')

const router = express.Router()

// /auth
// POST :: login user
router.post('/user/login', loginUser)

// POST :: register user
router.post('/user/register', registerUser)

// POST :: logout user
router.post('/user/logout', logoutUser)

// POST :: login user
router.post('/admin/register', registerAdmin)
router.post('/admin/login', loginAdmin)
router.post('/admin/logout', logoutAdmin)

module.exports = router
