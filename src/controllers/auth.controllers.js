const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { db } = require('../db/models')
const SuccessResponse = require('../core/success.response')
const ErrorResponse = require('../core/error.response')
const { Roles } = require('../helpers/RoleUser')
const { pickData } = require('../utils')

// register user controllers
const registerUser = async function (req, res, next) {
    /**
     * == Đăng ký người dùng mới ==
     * 1. tìm user trong db,
     *      nếu đã tồn tại user thì trả về lỗi
     *
     * 2. nếu không tìm thấy user trong db thì tạo mới user
     *      và trả về thông tin cho client
     */
    try {
        const { username, email, password } = req.body

        // tìm user trong db
        const user = await db.User.findOne({ where: { email }, raw: true })

        if (user) {
            // check user đã tồn tại và trả về lỗi
            throw new ErrorResponse({
                message: 'User already exists',
                status: StatusCodes.CONFLICT,
            })
        }
        // mã hóa mật khẩu
        const hashPassword = await bcrypt.hash(password, 10)
        // tạo access token secret và refresh token secret
        const at_secret = crypto.randomBytes(64).toString('hex')
        const rt_secret = crypto.randomBytes(64).toString('hex')

        // tạo mới user
        const newUser = await db.User.create({
            username,
            email,
            password: hashPassword,
            role: Roles.USER,
        })

        // tạo bản ghi vào database lưu trữ thông tin token của user
        const newToken = await db.Token.create({
            user_id: newUser.id,
            at_secret,
            rt_secret,
        })

        // các thông tin cần trả về cho người dùng
        const result = new SuccessResponse({
            message: 'User registered successful',
            statusCode: StatusCodes.CREATED,
            metadata: { user: pickData(newUser, ['email']) },
        })

        res.status(result.status).json(result)
        //
    } catch (error) {
        next(error)
    }
}

// login user controlller
const loginUser = async function (req, res, next) {
    /**
     * 1. tìm user trong db
     *      nếu không có thì trả về thông báo lỗi
     *
     * 2. nếu có user thì kiểm tra có đúng mật khẩu hay không
     *
     * 3. trả về thông tin cho user và tokens
     *
     */
    try {
        const { email, password } = req.body
        // tìm user trong db
        const user = await db.User.findOne({ where: { email }, raw: true })

        if (!user) {
            // check nếu người dùng không có trong db
            // trả về thông báo lỗi
            throw new ErrorResponse({
                message: 'User does not exist',
                status: StatusCodes.NOT_FOUND,
            })
        }

        // kiểm tra mật khẩu
        const isMatchPassword = await bcrypt.compare(password, user.password)

        if (!isMatchPassword) {
            // nếu mật khẩu không chính xác trả về lỗi
            throw new ErrorResponse({
                message: 'Incorrect password',
                status: StatusCodes.UNAUTHORIZED,
            })
        }

        // get at_secret and rt_secret from db
        const token = await db.Token.findOne({ where: { user_id: user.id } })
        // tạo token
        const access_token = jwt.sign({ user: user.email }, token.at_secret, {
            expiresIn: Date.now() + 1000 * 60 * 10, // thời gian hết hạn của token: 10 phút
        })
        const refresh_token = jwt.sign({ user: user.email }, token.rt_secret, {
            expiresIn: '180d', // thời gian hết hạn của token: 180 ngày
        })

        await token.update({ refresh_token })
        await token.save()

        const result = new SuccessResponse({
            message: 'Login successful',
            metadata: {
                user: pickData(user, ['email']),
                tokens: { access_token, refresh_token },
            },
        })

        res.status(result.status).json(result)
        //
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// logout user controller
const logoutUser = async function (req, res, next) {
    /**
     * 1. nhận refresh_token gửi lên từ client trong req.body
     *
     * 2. tìm token trong bảng token
     *  nếu tìm đc thì xóa refresh_token cũ
     *  và thêm refresh_token đấy và cột các token đã sử dụng
     *
     * 3. nếu không tìm thấy token thì trả về thông báo lỗi
     */
    try {
        // lấy refresh_token từ client
        const { refresh_token } = req.body
        // tìm token trong db
        const token = await db.Token.findOne({ where: { refresh_token } })

        if (!token) {
            // nếu token không tìm thấy
            throw new ErrorResponse({
                message: 'Logout failure',
                status: StatusCodes.FORBIDDEN,
            })
        }

        // thêm refresh_token vào cột used_token và xóa refresh_token đang có trong bảng
        const used_token = !token.used_token ? [] : JSON.parse(token.used_token)
        used_token.push(refresh_token)

        await token.update({
            used_token: JSON.stringify(used_token),
            refresh_token: null,
        })
        await token.save()

        const result = new SuccessResponse({ message: 'Logout successful' })
        res.status(result.status).json(result)
        //
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const registerAdmin = async function (req, res, next) {
    try {
        const { username, email, password } = req.body

        // tìm user trong db
        const user = await db.User.findOne({ where: { email }, raw: true })

        if (user) {
            // check user đã tồn tại và trả về lỗi
            throw new ErrorResponse({
                message: 'User already exists',
                status: StatusCodes.CONFLICT,
            })
        }
        // mã hóa mật khẩu
        const hashPassword = await bcrypt.hash(password, 10)
        // tạo access token secret và refresh token secret
        const at_secret = crypto.randomBytes(64).toString('hex')
        const rt_secret = crypto.randomBytes(64).toString('hex')

        // tạo mới user
        const newUser = await db.User.create({
            username,
            email,
            password: hashPassword,
            role: Roles.ADMIN,
        })

        // tạo bản ghi vào database lưu trữ thông tin token của user
        const newToken = await db.Token.create({
            user_id: newUser.id,
            at_secret,
            rt_secret,
        })

        const result = new SuccessResponse({
            message: 'Admin registered successful',
            statusCode: StatusCodes.CREATED,
            metadata: { user: pickData(newUser, ['email']) },
        })
        res.status(result.status).json(result)
        //
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const loginAdmin = async function (req, res, next) {
    /**
     * 1. tìm user trong db
     *      nếu không có thì trả về thông báo lỗi
     *
     * 2. nếu có user thì kiểm tra có đúng mật khẩu hay không
     *
     * 3. trả về thông tin cho user và tokens
     *
     */
    try {
        const { email, password } = req.body
        // tìm user trong db
        const user = await db.User.findOne({ where: { email }, raw: true })

        if (!user) {
            // check nếu người dùng không có trong db
            // trả về thông báo lỗi
            throw new ErrorResponse({
                message: 'User does not exist',
                status: StatusCodes.NOT_FOUND,
            })
        }

        if (user.role !== Roles.ADMIN) {
            // check quyền admin người dùng
            // trả về thông báo lỗi
            throw new ErrorResponse({
                message: 'User does not have permissions',
                status: StatusCodes.FORBIDDEN,
            })
        }

        // kiểm tra mật khẩu
        const isMatchPassword = await bcrypt.compare(password, user.password)

        if (!isMatchPassword) {
            // nếu mật khẩu không chính xác trả về lỗi
            throw new ErrorResponse({
                message: 'Incorrect password',
                status: StatusCodes.UNAUTHORIZED,
            })
        }

        // get at_secret and rt_secret from db
        const token = await db.Token.findOne({ where: { user_id: user.id } })
        // tạo token
        const access_token = jwt.sign({ user: user.email }, token.at_secret, {
            expiresIn: '10m', // thời gian hết hạn của token: 10 phút
        })
        const refresh_token = jwt.sign({ user: user.email }, token.rt_secret, {
            expiresIn: '180d', // thời gian hết hạn của token: 180 ngày
        })

        await token.update({ refresh_token })
        await token.save()

        const result = new SuccessResponse({
            message: 'Login successful',
            metadata: {
                user: pickData(user, ['email']),
                tokens: { access_token, refresh_token },
            },
        })

        res.status(result.status).json(result)
        //
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const logoutAdmin = async function (req, res, next) {
    /**
     * 1. nhận refresh_token gửi lên từ client trong req.body
     *
     * 2. tìm token trong bảng token
     *  nếu tìm đc thì xóa refresh_token cũ
     *  và thêm refresh_token đấy và cột các token đã sử dụng
     *
     * 3. nếu không tìm thấy token thì trả về thông báo lỗi
     */
    try {
        // lấy refresh_token từ client
        const { refresh_token } = req.body

        // tìm token trong db
        const token = await db.Token.findOne({ where: { refresh_token } })

        if (!token) {
            // nếu token không tìm thấy
            throw new ErrorResponse({
                message: 'Logout failure',
                status: StatusCodes.FORBIDDEN,
            })
        }

        const decode = jwt.verify(refresh_token, token.rt_secret)

        const user = await db.User.findOne({ where: { email: decode.user } })

        if (!user) {
            // check nếu người dùng không có trong db
            // trả về thông báo lỗi
            throw new ErrorResponse({
                message: 'User does not exist',
                status: StatusCodes.NOT_FOUND,
            })
        }

        if (user.role !== Roles.ADMIN) {
            // check quyền admin người dùng
            // trả về thông báo lỗi
            throw new ErrorResponse({
                message: 'User does not have permissions',
                status: StatusCodes.FORBIDDEN,
            })
        }

        // thêm refresh_token vào cột used_token và xóa refresh_token đang có trong bảng
        // used_token: kiểu dữ liệu là mảng, chuyển sang kiểu tring rồi lưu vào db
        const used_token = !token.used_token ? [] : JSON.parse(token.used_token)
        used_token.push(refresh_token)

        // lưu dữ liệu thay đổi vào db
        await token.update({
            used_token: JSON.stringify(used_token),
            refresh_token: null,
        })
        await token.save()

        const result = new SuccessResponse({ message: 'Logout successful' })
        res.status(result.status).json(result)
        //
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerAdmin,
    loginAdmin,
    logoutAdmin,
}
