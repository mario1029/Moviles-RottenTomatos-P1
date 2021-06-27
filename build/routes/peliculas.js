"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_1 = require("../helpers/movie");
const router = express_1.Router();
router.get('/search/:titulo', async (req, res) => {
    try {
        const pelis = await movie_1.getMovie(req.params.titulo, req.body);
        res.json({ status: 200, peliculas: pelis, message: "se encontraron peliculas" });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener las peliculas' });
    }
});
router.get('/movie/', async (req, res) => {
    try {
        const pelis = await movie_1.getDetailsMovie(req.body.pelicula);
        res.json({ status: 200, peliculas: pelis, message: "se encontraro la pelicula" });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
});
router.get('/search/gener/:genero', async (req, res) => {
    try {
        const genero = req.params.genero;
        const pelis = await movie_1.getGener(req.params.genero);
        res.json({ status: 200, peliculas: pelis, message: "se encontraro la pelicula" });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
});
exports.default = router;
//# sourceMappingURL=peliculas.js.map