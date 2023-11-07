'use strict'

const express = require('express')
const {
    loginUser,
    registerUser,
    logoutUser,
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
// router.post('/admin/login', loginUser)
// router.post('/admin/register', loginUser)
// router.post('/admin/logout', loginUser)

module.exports = router
