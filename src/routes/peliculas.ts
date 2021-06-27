import { Router } from 'express';
import {getDetailsMovie, getGener, getMovie} from '../helpers/movie'
import {buscarPeli,detallarPeli} from '../utils/api'
const router=Router();

router.get('/search/:titulo', async (req,res)=>{
    try{
        const pelis= await getMovie(req.params.titulo,req.body);
        res.json({status: 200, peliculas:pelis,message:"se encontraron peliculas" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener las peliculas' });
    
    }
})

router.get('/movie/', async(req,res)=>{
    try{
        const pelis= await getDetailsMovie(req.body.pelicula);
        res.json({status: 200, peliculas:pelis,message:"se encontraro la pelicula" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
})

router.get('/search/gener/:genero',async(req,res)=>{
    try{
        const genero=req.params.genero;
        const pelis= await getGener(req.params.genero);
        res.json({status: 200, peliculas:pelis,message:"se encontraro la pelicula" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
}) 

export default router;