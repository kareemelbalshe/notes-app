import { Router } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv'
dotenv.config()

const router = Router()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3333/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: profile.photos[0].value,
        };

        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await User.create(newUser);
                done(null, user);
            }
        } catch (error) {
            console.log(error);
        }
    }
));

router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failure', successRedirect: '/dashboard' })
)

router.get('/login-failure', (req, res) => {
    res.send('Login Failed...')
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            res.send("error logging out")
        }
        else {
            res.redirect('/')
        }
    })
    res.redirect('/')
})

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

export default router