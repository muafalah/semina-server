const Categories = require('../../api/v1/categories/model')
const { BadRequestError, NotFoundError } = require('../../errors')

const createCategories = async (req) => {
    const { name } = req.body

    // Mencari apakah Categories ada nama yang sama
    const checkDuplicate = await Categories.findOne({ name: name })
    if (checkDuplicate) throw new BadRequestError('Nama kategori sudah pernah digunakan')

    const result = await Categories.create({ name: name })

    return result
}

const getAllCategories = async (req) => {
    const result = await Categories.find()
        // Data apa saja yang ingin ditampilkan
        .select('_id name')

    return result
}

const getOneCategories = async (req) => {
    const { id } = req.params

    const result = await Categories.findOne({ _id: id })
        // Data apa saja yang ingin ditampilkan
        .select('_id name')

    // Pengecekan apakah id kategori benar atau tidak
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    return result
}

const updateCategories = async (req) => {
    const { id } = req.params
    const { name } = req.body

    // Pengecekan apakah id kategori benar atau tidak
    const check = await Categories.findOne({ _id: id })
    if (!check) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    // Pengecekan apakah ada kategori dengan nama yang sama
    const checkDuplicate = await Categories.findOne({ _id: { $ne: id }, name: name })
    if (checkDuplicate) throw new BadRequestError('Nama kategori sudah pernah digunakan')

    const result = await Categories.findOneAndUpdate(
        { _id: id },
        { name: name },
        { new: true, runValidators: true }
    )
        // Data apa saja yang ingin ditampilkan
        .select('_id name')

    return result
}

const deleteCategories = async (req) => {
    const { id } = req.params

    const result = await Categories.findOneAndDelete({ _id: id })
        // Data apa saja yang ingin ditampilkan
        .select('_id name')

    // Pengecekan apakah id kategori benar atau tidak
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    return result
}

const checkingCategories = async (id) => {
    const result = await Categories.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    return result;
};

module.exports = {
    createCategories,
    getAllCategories,
    getOneCategories,
    updateCategories,
    deleteCategories,
    checkingCategories,
}