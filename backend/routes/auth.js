const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const obj = {
        a: 'Mujahid',
        b: 123
    }
    res.json(obj)
})

module.exports = router
