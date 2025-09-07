import express from 'express'
import getUserDetails from '../controllers/user.controllers.js'
import isAuth from '../middleware/isAuth.js'

const userDetailsRouter = express.Router()

userDetailsRouter.get('/getuser', isAuth, getUserDetails)

export default userDetailsRouter        