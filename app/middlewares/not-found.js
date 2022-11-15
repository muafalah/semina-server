// Digunakan jika URL API tidak ditemukan
const notFound = (req, res) => {
    res.status(404).send({ msg: 'Route does not exist' })
}

module.exports = notFound