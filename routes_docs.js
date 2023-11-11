'use strict'

/**
 * Routes docs
 *
 * == TOKENS =================================================
 * - get access_token: http://localhost:3000/token/getAccessToken
 *      + method: post
 *      + Content-Type: application/x-www-form-urlencoded
 *                      application/json
 *      + body: - refresh_token: string
 *
 * == ADMIN ==================================================
 * - register admin: http://localhost:3000/auth/admin/register
 *      + method: post
 *      + Content-Type: application/x-www-form-urlencoded
 *                      application/json
 *      + body: - username: string
 *              - email: string
 *              - password: string
 *
 * - login admin: http://localhost:3000/auth/admin/login
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - email: string
 *              - password: string
 *
 * - logout admin: http://localhost:3000/auth/admin/logout
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - refresh_token: string
 *
 * == ADMIN EXAM ===========================================
 * - Create exam admin: http://localhost:3000/exam/create
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - email: string
 *              - access_token: string
 *              - name: string
 *              - subject: string
 *              - number_question: integer
 *              - time: integer
 *
 * - Create question admin: http://localhost:3000/exam/question/create
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - email: string
 *              - access_token: string
 *              - exam_id: string
 *              - questions: array
 *                          [
 *                              {
 *                                  - content: string
 *                                  - answers: array
 *                                  [
 *                                      {
 *                                          content: string
 *                                          is_true: boolean
 *                                      }
 *                                  ]
 *                              }
 *                          ]
 *
 * == USER =================================================
 * - register user: http://localhost:3000/auth/user/register
 *      + method: post
 *      + Content-Type: application/x-www-form-urlencoded
 *                      application/json
 *      + body: - username: string
 *              - email: string
 *              - password: string
 *
 * - login user: http://localhost:3000/auth/user/login
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - email: string
 *              - password: string
 *
 * - logout user: http://localhost:3000/auth/user/logout
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - refresh_token: string
 *
 *
 * == NONE =================================================
 * - Get list exam: http://localhost:3000/exam/getListExam
 *      + method: post
 *
 * - Get info exam: http://localhost:3000/exam/getInfoExam
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - exam_id: integer
 *
 * - Get detail exam: http://localhost:3000/exam/getDetailExam
 *      + method: post
 *      + Content-Type: - application/x-www-form-urlencoded
 *                      - application/json
 *      + body: - exam_id: integer
 */
