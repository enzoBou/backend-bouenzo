import passport from "passport";
/* import GithubStrategy from 'passport-github2'
import userModel from "../dao/models/user.model"; */
import ROLES from "./role.js";
import jwt from 'passport-jwt'
import SECRET_JWT from "../utils/jwt.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Bearer atokenaskjehbdkajdhkahdka
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        console.log(jwtPayload);
        try {
          if (ROLES.includes(jwtPayload.role)) {
            return done(null, jwtPayload);
          }
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

// GITHUB STRATEGY
/* const initializePassport = () => {
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
}; */

export default initializePassport;