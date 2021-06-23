import express from 'express';
import { cors } from './middlewares/middlewares';
import routes from './routes/index.js';
import session from 'express-session';
import passport from 'passport';
import { LocalStrategy } from './utils/strategies';

const app = express();

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'superkey',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors);

app.get('/', (req, res) => {
  res.send('hi, estas en el inicio');
});

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app.use(passport.initialize());

app.use(passport.session());

app.use('/', routes);

export default app;
