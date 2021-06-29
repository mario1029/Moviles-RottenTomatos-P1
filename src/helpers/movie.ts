import Pool from '@utils/pool';
import { movieQueries } from '@utils/queries';
import {pelicula,peliculaDetallada} from '@interfaces/pelicula'
import { buscarPeli, detallarPeli } from '@utils/api';
import { comentario } from '@interfaces/comentario';

const pool = Pool.getInstance();

export const getMovie= async (titulo, body): Promise<pelicula[]> =>{
   
    const client = await pool.connect();
    const {tipo,anio,page}=body;
    const peliculas= (await client.query(movieQueries.GET_MOVIE_BY_TITLE,[titulo])).rows;
    console.log(peliculas.length>0)
    if(peliculas.length>0){
        const peli:pelicula[]=peliculas.map((pel)=>{
            return{
                id:pel.id_pelicula_serie,
                titulo:pel.titulo,
                anio:pel.anio,
                tipo:pel.tipo,
                poster:pel.poster
            }
        })
        console.log(peli);
        return peli;
    }else{
        const peli:pelicula[]= await buscarPeli(titulo,body);
        console.log(peli);
        //guardar datos en la bd
        peli.map(async (rows)=>{
            try{
                await client.query("BEGIN");
                const peli_guardada= await client.query(movieQueries.INSERT_MOVIE,[rows.id,rows.titulo,rows.tipo,rows.anio,rows.poster])
                console.log(peli_guardada);
                await client.query("COMMIT");
            }catch(e){
                await client.query("CALLBACK");
                throw e;
            }
        })
        return peli; 
    } 
}

export const getDetailsMovie=async(titulo:string): Promise<peliculaDetallada>=>{
    const client = await pool.connect();
    console.log("hola")
    try{
        const peliculas= (await client.query(movieQueries.GET_MOVIE,[titulo])).rows[0];
    console.log(peliculas.genero!=null)
    if(peliculas.genero!=null){
        console.log(peliculas.id_pelicula_serie)
        const peli:peliculaDetallada=
        {
            id:peliculas.id_pelicula_serie,
            titulo:peliculas.titulo,
            anio:peliculas.anio,
            tipo:peliculas.tipo,
            poster:peliculas.poster,
            genero:peliculas.genero,
            duracion:peliculas.duracion,
            director:peliculas.director,
            sinopsis:peliculas.sinopsis,
            rating:peliculas.rating,
        }
        console.log(peli)
    return peli;
    }else{
        try {
            console.log("hola")
            await client.query("BEGIN")
            const pelicula=await detallarPeli(titulo);
            const {genero, duracion, director,sinopsis,id}=pelicula;
            console.log(pelicula);
            const peliculaDetallada= (await client.query(movieQueries.UPDATE_MOVIE,[duracion,director,sinopsis,genero,id])).rows[0]
            console.log(peliculaDetallada);
            await client.query("COMMIT")
            return peliculaDetallada;   
        } catch (e) {
            await client.query("CALLBACK")
            console.log(e)
            throw e;
        }
    }
    }catch(e){
        console.log(e)
        throw e;
    }
}


export const getGener=async (genero:string): Promise<pelicula[]>=>{
  try {
    const client = await pool.connect();
    console.log("hola");
    const peliculas= (await client.query(movieQueries.GET_MOVIE_BY_GENER,[genero])).rows;
    console.log(peliculas)
    const peli:pelicula[]=peliculas.map((pel)=>{
        return{
            id:pel.id_pelicula_serie,
            titulo:pel.titulo,
            anio:pel.anio,
            tipo:pel.tipo,
            poster:pel.poster
        }
    })
    console.log(peli);
    return peli;
  } catch (e) {
      throw e;
  }
}

export const getComment=async(titulo:string):Promise<comentario[]>=>{
    const client = await pool.connect();
    const comentarios= (await client.query(movieQueries.GET_COMMENT,[titulo])).rows;
    const comments:comentario[]=comentarios.map((rows)=>{
        return{
           usuario:rows.alias, 
           contenido:rows.contenido,
           puntuacion:rows.puntuacion,
           fecha:rows.fecha
        }        
    })
    console.log(comments);
    return comments;
}

export const insertComment=async(titulo, body,alias):Promise<comentario>=>{
    const client = await pool.connect();
    const {contenido,puntuacion}=body;
    const comentarios= (await client.query(movieQueries.INSERT_COMMENT,[titulo,alias,contenido,puntuacion])).rows[0];
    const comments:comentario={
           usuario:comentarios.alias, 
           contenido:comentarios.contenido,
           puntuacion:comentarios.puntuacion,
           fecha:comentarios.fecha        
    }
    console.log(comments);
    return comments;
}