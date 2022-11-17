const { UnauthenticatedError, UnauthorizedError } = require('../errors')
const { isTokenValid } = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {
    try {
        let token

        // Mengambil data auth di headers
        const authHeader = req.headers.authorization

        // Melakukan pengecekan apakah token ada ataukah tidak
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        // Jika token tidak ada maka akan mereturn berikut
        if (!token) throw new UnauthenticatedError('Authentication Invalid')

        // Mengecek apakah token benar-benar valid atau tidak
        const payload = isTokenValid({ token })

        // Mengambil data yang ada didalam token
        req.user = {
            id: payload.userId,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            organizer: payload.organizer,
        }

        next()
    } catch (error) {
        next(error)
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) throw new UnauthorizedError('Unauthorized to access this route')
        next()
    }
}

module.exports = { authenticateUser, authorizeRoles }