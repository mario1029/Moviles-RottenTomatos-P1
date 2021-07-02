"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertComment = exports.getComment = exports.getGener = exports.getDetailsMovie = exports.getMovie = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const api_1 = require("@utils/api");
const pool = pool_1.default.getInstance();
const getMovie = async (titulo, body) => {
    const client = await pool.connect();
    try {
        const peliculas = (await client.query(queries_1.movieQueries.GET_MOVIE_BY_TITLE, [titulo])).rows;
        console.log(peliculas.length > 0);
        if (peliculas.length > 0) {
            const peli = peliculas.map((pel) => {
                return {
                    id: pel.id_pelicula_serie,
                    titulo: pel.titulo,
                    anio: pel.anio,
                    tipo: pel.tipo,
                    poster: pel.poster
                };
            });
            console.log(peli);
            return peli;
        }
        else {
            const peli = await api_1.buscarPeli(titulo, body);
            console.log(peli);
            //guardar datos en la bd
            peli.map(async (rows) => {
                try {
                    await client.query("BEGIN");
                    const peli_guardada = await client.query(queries_1.movieQueries.INSERT_MOVIE, [rows.id, rows.titulo, rows.tipo, rows.anio, rows.poster]);
                    console.log(peli_guardada);
                    await client.query("COMMIT");
                }
                catch (e) {
                    await client.query("CALLBACK");
                    throw e;
                }
            });
            return peli;
        }
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getMovie = getMovie;
const getDetailsMovie = async (titulo) => {
    const client = await pool.connect();
    console.log("hola");
    try {
        const peliculas = (await client.query(queries_1.movieQueries.GET_MOVIE, [titulo])).rows[0];
        console.log(peliculas.genero != null);
        if (peliculas.genero != null) {
            console.log(peliculas.id_pelicula_serie);
            const peli = {
                id: peliculas.id_pelicula_serie,
                titulo: peliculas.titulo,
                anio: peliculas.anio,
                tipo: peliculas.tipo,
                poster: peliculas.poster,
                genero: peliculas.genero,
                duracion: peliculas.duracion,
                director: peliculas.director,
                sinopsis: peliculas.sinopsis,
                rating: peliculas.rating,
            };
            console.log(peli);
            return peli;
        }
        else {
            try {
                console.log("hola");
                await client.query("BEGIN");
                const pelicula = await api_1.detallarPeli(titulo);
                const { genero, duracion, director, sinopsis, id } = pelicula;
                console.log(pelicula);
                const peliculaDetallada = (await client.query(queries_1.movieQueries.UPDATE_MOVIE, [duracion, director, sinopsis, genero, id])).rows[0];
                console.log(peliculaDetallada);
                await client.query("COMMIT");
                return peliculaDetallada;
            }
            catch (e) {
                await client.query("CALLBACK");
                console.log(e);
                throw e;
            }
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getDetailsMovie = getDetailsMovie;
const getGener = async (genero) => {
    const client = await pool.connect();
    try {
        console.log("hola");
        const peliculas = (await client.query(queries_1.movieQueries.GET_MOVIE_BY_GENER, [genero])).rows;
        console.log(peliculas);
        const peli = peliculas.map((pel) => {
            return {
                id: pel.id_pelicula_serie,
                titulo: pel.titulo,
                anio: pel.anio,
                tipo: pel.tipo,
                poster: pel.poster
            };
        });
        console.log(peli);
        return peli;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getGener = getGener;
const getComment = async (titulo) => {
    const client = await pool.connect();
    const comentarios = (await client.query(queries_1.movieQueries.GET_COMMENT, [titulo])).rows;
    const comments = comentarios.map((rows) => {
        return {
            usuario: rows.alias,
            contenido: rows.contenido,
            puntuacion: rows.puntuacion,
            fecha: rows.fecha
        };
    });
    console.log(comments);
    client.release();
    return comments;
};
exports.getComment = getComment;
const insertComment = async (titulo, body) => {
    const client = await pool.connect();
    try {
        const { usuario, contenido, puntuacion } = body;
        console.log(usuario, contenido, puntuacion);
        const comentarios = (await client.query(queries_1.movieQueries.INSERT_COMMENT, [titulo, usuario, contenido, puntuacion])).rows[0];
        const comments = {
            usuario: comentarios.alias,
            contenido: comentarios.contenido,
            puntuacion: comentarios.puntuacion,
            fecha: comentarios.fecha
        };
        console.log(comments);
        return comments;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.insertComment = insertComment;
//# sourceMappingURL=movie.js.map