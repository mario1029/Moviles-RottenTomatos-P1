import { isAuth } from '@validations/auth';
import { checkResult, commentsValidation } from '@validations/fields';
import { Router } from 'express';
import {getComment, getDetailsMovie, getGener, getMovie, insertComment} from '@helpers/movie'
const router=Router();

router.get('/search/:titulo', async (req,res)=>{
    try{
        const pelis= await getMovie(req.params.titulo,req.body);
        res.json({status: 200, peliculas:pelis,message:"se encontraron peliculas" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener las peliculas' });
    
    }
})

router.get('/movie/:pelicula', async(req,res)=>{
    try{
        const pelis= await getDetailsMovie(req.params.pelicula);
        res.json({status: 200, peliculas:pelis,message:"se encontraro la pelicula" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
})

router.get('/search/gener/:genero',async(req,res)=>{
    try{
        const pelis= await getGener(req.params.genero);
        res.json({status: 200, peliculas:pelis,message:"se encontraro la pelicula" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
}) 

router.get('/comments/:pelicula', async(req,res)=>{
    try{
        const pelis= await getComment(req.params.pelicula);
        res.json({status: 200, peliculas:pelis,message:"se encontraro la pelicula" })
    }catch(e){
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
})

router.post('/comments/:pelicula',commentsValidation,checkResult, async(req,res)=>{
    try{
        console.log(req.body.contenido);
        console.log(req.params.pelicula)
        const pelis= await insertComment(req.params.pelicula,req.body);
        res.json({status: 200, peliculas:pelis,message:"se encontraro la pelicula" })
    }catch(e){
        console.log(e);
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener la pelicula' });
    }
})

export default router;