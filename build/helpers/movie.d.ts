import { pelicula, peliculaDetallada } from '../interfaces/pelicula';
export declare const getMovie: (titulo: any, body: any) => Promise<pelicula[]>;
export declare const getDetailsMovie: (titulo: string) => Promise<peliculaDetallada>;
export declare const getGener: (genero: string) => Promise<pelicula[]>;
//# sourceMappingURL=movie.d.ts.map