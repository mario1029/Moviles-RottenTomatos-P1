import fetch from 'node-fetch'
const { URLSearchParams } = require('url');
import { pelicula, peliculaDetallada } from '@interfaces/pelicula'

export const buscarPeli= async (titulo,parametros): Promise<pelicula[]>=>{
    const {tipo,anio,page}=parametros;
    const params = new URLSearchParams({
        apiKey:'438924d4',
        s:titulo
    });
    if(tipo!=null){
        params.append('type',tipo);
    }
    if(anio!=null){
        params.append('y',anio);
    } 
    if(page!=null){
        params.append('page',page);
    }   
    const url= new URL("http://www.omdbapi.com/");
    url.search=params;
    const response= await fetch(url.toString());
    const res=await response.json();
    if(res.Error!=null)
        throw res.Error  
    const pelis=res.Search;
    const peli:pelicula[]=pelis.map((pel)=>{
        return{
            id:pel.imdbID,
            titulo:pel.Title,
            anio:pel.Year,
            tipo:pel.Type,
            poster:pel.Poster
        }
    })
    return peli;
}

export const detallarPeli= async (id:string): Promise<peliculaDetallada>=>{
    const params = new URLSearchParams({
        apiKey:'438924d4',
        i:id
    });
    const url= new URL("http://www.omdbapi.com/");
    url.search=params;
    const response= await fetch(url.toString());
    const res=await response.json();
    const peli:peliculaDetallada=
        {
            id:res.imdbID,
            titulo:res.Title,
            anio:res.Year,
            tipo:res.Type,
            poster:res.Poster,
            genero:res.Genre,
            duracion:res.Runtime,
            director:res.Director,
            sinopsis:res.Plot,
            rating:0.0
        }
    return peli;
}