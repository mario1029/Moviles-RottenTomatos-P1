import { getUserByID, comparePassword } from '../helpers/session';
import { Strategy } from 'passport-local';

//Nota: La cedula tambien es el el username

export const LocalStrategy = new Strategy(
  {
    usernameField: 'cedula',
    passwordField: 'contra',
  },
  async (cedula, contra, done) => {
    try {
      const user = await getUserByID(cedula);

      if (!user) {
        return done(null, false);
      }

      const isMatch = await comparePassword(contra, user.contra);

      delete user.contra;
      return isMatch ? done(null, user) : done(null, false);
    } catch (e) {
      return done(null, false);
    }
  }
);
