"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detallarPeli = exports.buscarPeli = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const { URLSearchParams } = require('url');
const buscarPeli = async (titulo, parametros) => {
    const { tipo, anio, page } = parametros;
    const params = new URLSearchParams({
        apiKey: '438924d4',
        s: titulo
    });
    if (tipo != null) {
        params.append('type', tipo);
    }
    if (anio != null) {
        params.append('y', anio);
    }
    if (page != null) {
        params.append('page', page);
    }
    const url = new URL("http://www.omdbapi.com/");
    url.search = params;
    const response = await node_fetch_1.default(url.toString());
    const res = await response.json();
    if (res.Error != null)
        throw res.Error;
    const pelis = res.Search;
    const peli = pelis.map((pel) => {
        return {
            id: pel.imdbID,
            titulo: pel.Title,
            anio: pel.Year,
            tipo: pel.Type,
            poster: pel.Poster
        };
    });
    return peli;
};
exports.buscarPeli = buscarPeli;
const detallarPeli = async (titulo) => {
    const params = new URLSearchParams({
        apiKey: '438924d4',
        t: titulo
    });
    const url = new URL("http://www.omdbapi.com/");
    url.search = params;
    const response = await node_fetch_1.default(url.toString());
    const res = await response.json();
    const peli = {
        id: res.imdbID,
        titulo: res.Title,
        anio: res.Year,
        tipo: res.Type,
        poster: res.Poster,
        genero: res.Genre,
        duracion: res.Runtime,
        director: res.Director,
        sinopsis: res.Plot,
        rating: 0.0
    };
    return peli;
};
exports.detallarPeli = detallarPeli;
//# sourceMappingURL=api.js.map