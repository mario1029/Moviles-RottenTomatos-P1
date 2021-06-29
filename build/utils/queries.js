"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieQueries = exports.queries = void 0;
exports.queries = {
    GET_USERS: `SELECT * FROM usuario`,
    GET_USER_BY_ALIAS: `SELECT * FROM usuario WHERE alias = $1`,
    GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
    SIGN_UP_USER: `INSERT INTO usuario (alias, correo, descripcion, contrasenia) VALUES ($1, $2, $3, $4) RETURNING *`,
    UPDATE_USER_BY_ALIAS: `UPDATE usuario SET alias = $1, correo = $2, descripcion = $3 WHERE alias = $4 RETURNING *`,
    UPDATE_USER_BY_EMAIL: `UPDATE usuario SET alias = $1, correo = $2, descripcion = $3 WHERE correo = $4 RETURNING *`,
    DELETE_USER_BY_ALIAS: `DELETE FROM usuario WHERE alias = $1`,
    DELETE_USER_BY_EMAIL: `DELETE FROM usuario WHERE correo = $1`,
};
exports.movieQueries = {
    GET_MOVIE: `SELECT * FROM pelicula_serie where UPPER(titulo) like UPPER($1) `,
    GET_MOVIE_BY_TITLE: `SELECT id_pelicula_serie, titulo, anio, tipo, poster FROM pelicula_serie where UPPER(titulo) like '%' || UPPER($1) || '%'`,
    GET_MOVIE_BY_TITLE_AND_YEAR: `SELECT id_pelicula_serie,titulo, anio, tipo, poster FROM pelicula_serie where UPPER(titulo) like '%' || UPPER($1) || '%' and anio=$2`,
    GET_MOVIE_BY_GENER: `SELECT id_pelicula_serie, titulo, anio, tipo, poster FROM pelicula_serie where UPPER(genero) like '%' || UPPER($1) || '%'`,
    INSERT_MOVIE: `INSERT INTO pelicula_serie ( id_pelicula_serie, titulo, tipo, anio, poster) values ($1,$2,$3,$4,$5) RETURNING *`,
    UPDATE_MOVIE: `UPDATE pelicula_serie SET duracion = $1, director = $2, sinopsis = $3, genero = $4 WHERE id_pelicula_serie = $5  RETURNING *`,
    GET_COMMENT: `SELECT * FROM comentario WHERE id_pelicula_serie=(SELECT id_pelicula_serie FROM pelicula_serie WHERE UPPER(titulo) like UPPER($1) )`,
    INSERT_COMMENT: `INSERT INTO comentario (id_pelicula_serie, alias, contenido, puntuacion) values ((SELECT id_pelicula_serie FROM pelicula_serie WHERE UPPER(titulo) like UPPER($1)),(SELECT alias FROM usuario where correo like $2),$3,$4) RETURNING *`
};
//# sourceMappingURL=queries.js.map