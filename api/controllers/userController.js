const router = require('express').Router()

const authService = require('../services/authService')

router.post('/users', async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400).send({
            error: {
                message: 'Please provide email and password'
            }
        })

        return
    }

    try {
        const payload = await authService.register(email, password)
        res.send(payload)
    } catch (e) {
        res.status(409).send({error: e.message})
    }
})

router.post('/auth', async (req, res) => {
    const {email, password} = req.body

    try {
        const payload = await authService.login(email, password)
        res.send(payload)
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

router.all('/logout', (req, res) => {
    res.send({ok: true})
})

module.exports = router