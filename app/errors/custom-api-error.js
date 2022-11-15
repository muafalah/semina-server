// Digunakan untuk meneruskan message kustom error, sehingga hanya menerima parameter message
class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = CustomAPIError