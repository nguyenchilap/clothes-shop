import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";

import userService from "../services/user.service";

import AUTH_CONSTANT from "../configs/auth/index.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AUTH_CONSTANT.JWT_SECRET
};

passport.use(new JwtStrategy(options, async function(jwt_payload, done) {
    try {
        const user = userService.findById(jwt_payload.sub);
        if (user) {
            done(null, {id: user._id});
        }
        done(null, false);
    } catch (e) {
        done(e, false);
    }
}));

passport.use(new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
        try {
        const user = await userService.checkCredentials({email, password});
    
        if (user) {
            return done(null, {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone
            });
        }
        return done(null, false);

        } catch (e) {
            return done(e, false);
        }
    }
));

function jwtAuth() {
    return passport.authenticate('jwt', { session: false });
}
  
export  { passport, jwtAuth };