export interface pelicula{
    id:string;
    titulo:string;
    anio:number;
    tipo:string;
    poster:string;
}

export interface peliculaDetallada extends pelicula{
    genero: string;
    duracion: string;
    director: string;
    sinopsis: string;
}