import dotenv from 'dotenv'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import route from './server/routes/index.js'
import dashboardRoute from './server/routes/dashboard.js'
import authRouter from './server/routes/auth.js'
import { connectDB } from './server/config/db.js'
import session from 'express-session'
import passport from 'passport'
import MongoStore from 'connect-mongo'
dotenv.config()

const app = express()

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.MONGODB_URI }),
    // cookie: { maxAge: new Date(Date.now() + (3600000)) }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB()

app.use(express.static('public'))

app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use("/", route)
app.use("/", dashboardRoute)
app.use("/", authRouter)

app.get('*', (req, res) => {
    res.status(404).render('404')
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})