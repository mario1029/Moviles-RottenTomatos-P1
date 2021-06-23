"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const session_1 = require("../helpers/session");
const passport_local_1 = require("passport-local");
//Nota: La cedula tambien es el el username
exports.LocalStrategy = new passport_local_1.Strategy({
    usernameField: 'cedula',
    passwordField: 'contra',
}, async (cedula, contra, done) => {
    try {
        const user = await session_1.getUserByID(cedula);
        if (!user) {
            return done(null, false);
        }
        const isMatch = await session_1.comparePassword(contra, user.contra);
        delete user.contra;
        return isMatch ? done(null, user) : done(null, false);
    }
    catch (e) {
        return done(null, false);
    }
});
//# sourceMappingURL=strategies.js.map