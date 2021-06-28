"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/alias");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("@middlewares/middlewares");
const routes_1 = __importDefault(require("./routes"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const strategies_1 = require("@utils/strategies");
const app = express_1.default();
app.use('/views', express_1.default.static(__dirname + '/public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    secret: 'superkey',
    resave: false,
    saveUninitialized: false,
}));
app.use(middlewares_1.cors);
app.get('/', (req, res) => {
    res.send('hi, estas en el inicio');
});
passport_1.default.use(strategies_1.LocalStrategy);
passport_1.default.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
});
passport_1.default.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', routes_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map