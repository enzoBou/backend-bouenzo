const passport = require("passport")
const GithubStrategy = require("passport-github2")
const userModel = require("../dao/models/user.model")

const initializePassport = () => {
    passport.use("github", new GithubStrategy({
        clientID: "Iv1.80c3e24116ff8565",
        clientSecret: "3d000662701a52e67e1ae55f101e50563632bba1",
        callbackURL: "http://localhost:8080/api/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("PROFILE INFO ******", profile);
            let user = await userModel.findOne({ email: profile._json?.email });
            if (!user) {
            let addNewUser = {
                email: profile._json?.email,                                                
                password: "",
                username: profile._json.username,
                rol: profile._json.rol,
            };
            let newUser = await userModel.create(addNewUser);
            done(null, newUser);
            } else {
            done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id,done) => {
        let user = await userService.findById(id);
        done(null,user);
    });
};

module.exports = initializePassport;