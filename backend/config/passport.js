import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import passport from "passport";
import userModel from "../models/userModel.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        try {
            let user = await userModel.findOne({ googleId: profile.id });

            if(!user){
                user = await userModel.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName ||profile.name.givenName + ' ' + profile.name.familyName,
                    password: "",
                })
            }

            return cb(null, user);
        } catch (error) {
            return cb(error, null)
        }
    }
));

// passport.serializeUser((user, done) =>{
//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await userModel.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// })

export default passport;