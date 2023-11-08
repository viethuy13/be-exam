'use strict'

/**
 * Routes docs
 *
 * == ADMIN ==================================================
 * - register admin: http://localhost:3000/auth/admin/register
 *      + method: post
 *      + Content-Type: application/x-www-form-urlencoded
 *                      application/json
 *      + body: - username
 *              - email
 *              - password
 *
 * - login admin: http://localhost:3000/auth/admin/login
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - email
 *              - password
 *
 * - logout admin: http://localhost:3000/auth/admin/login
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - refresh_token
 *
 * == USER =================================================
 * - register user: http://localhost:3000/auth/user/register
 *      + method: post
 *      + Content-Type: application/x-www-form-urlencoded
 *                      application/json
 *      + body: - username
 *              - email
 *              - password
 *
 * - login user: http://localhost:3000/auth/user/login
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - email
 *              - password
 *
 * - logout user: http://localhost:3000/auth/user/login
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - refresh_token
 */
