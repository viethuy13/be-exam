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

// POST :: register admin
router.post('/admin/register', registerAdmin)

// POST :: login admin
router.post('/admin/login', loginAdmin)

// POST :: logout admin
router.post('/admin/logout', logoutAdmin)

module.exports = router
