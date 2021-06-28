import { pelicula, peliculaDetallada } from '../interfaces/pelicula';
import { comentario } from '@interfaces/comentario';
export declare const getMovie: (titulo: any, body: any) => Promise<pelicula[]>;
export declare const getDetailsMovie: (titulo: string) => Promise<peliculaDetallada>;
export declare const getGener: (genero: string) => Promise<pelicula[]>;
export declare const getComment: (titulo: string) => Promise<comentario[]>;
export declare const insertComment: (titulo: any, body: any) => Promise<comentario>;
//# sourceMappingURL=movie.d.ts.map