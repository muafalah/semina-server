const Events = require('../../api/v1/events/model')
const { BadRequestError, NotFoundError } = require('../../errors')
const { checkingCategories } = require('./categories')
const { checkingImages } = require('./images')
const { checkingTalents } = require('./talents')

const createEvents = async (req) => {
    const {
        title,
        price,
        date,
        about,
        tagline,
        keyPoint,
        venueName,
        statusEvent,
        ticket,
        image,
        category,
        talent,
    } = req.body

    await checkingImages(image)
    await checkingCategories(category)
    await checkingTalents(talent)

    const checkDuplicate = await Events.findOne({ title: title })
    if (checkDuplicate) throw new BadRequestError('Judul acara sudah pernah digunakan')

    const result = await Events.create({
        title: title,
        price: price,
        date: date,
        about: about,
        tagline: tagline,
        keyPoint: keyPoint,
        venueName: venueName,
        statusEvent: statusEvent,
        ticket: ticket,
        image: image,
        category: category,
        talent: talent,
    })

    return result
}

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query

    let condition = {}

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } }
    }
    if (category) {
        condition = { ...condition, category: category }
    }
    if (talent) {
        condition = { ...condition, talent: talent }
    }

    const result = await Events.find(condition)
        .populate({
            path: 'image',
            select: '_id name',
        })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: {
                path: 'image',
                select: '_id name',
            }
        })

    return result
}

const getOneEvents = async (req) => {
    const { id } = req.params

    const result = await Events.findOne({ _id: id })
        .populate({
            path: 'image',
            select: '_id name',
        })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: {
                path: 'image',
                select: '_id name',
            }
        })

    if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`)

    return result
}

const updateEvents = async (req) => {
    const { id } = req.params

    const {
        title,
        price,
        date,
        about,
        tagline,
        keyPoint,
        venueName,
        statusEvent,
        ticket,
        image,
        category,
        talent,
    } = req.body

    await checkingImages(image)
    await checkingCategories(category)
    await checkingTalents(talent)

    const check = await Events.findOne({ _id: id })
    if (!check) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    const checkDuplicate = await Events.findOne({ _id: { $ne: id }, title: title })
    if (checkDuplicate) throw new BadRequestError('Judul acara sudah pernah digunakan')

    const result = await Events.findOneAndUpdate(
        { _id: id },
        {
            title: title,
            price: price,
            date: date,
            about: about,
            tagline: tagline,
            keyPoint: keyPoint,
            venueName: venueName,
            statusEvent: statusEvent,
            ticket: ticket,
            image: image,
            category: category,
            talent: talent,
        },
        { new: true, runValidators: true }
    )
        .populate({
            path: 'image',
            select: '_id name',
        })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: {
                path: 'image',
                select: '_id name',
            }
        })

    return result
}

const deleteEvents = async (req) => {
    const { id } = req.params

    const result = await Events.findOneAndDelete({ _id: id })
        .populate({
            path: 'image',
            select: '_id name',
        })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: {
                path: 'image',
                select: '_id name',
            }
        })

    if (!result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

    return result
}

module.exports = {
    createEvents,
    getAllEvents,
    getOneEvents,
    updateEvents,
    deleteEvents,
}