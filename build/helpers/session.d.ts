import Usuario from '../interfaces/usuario';
export declare const signUpUser: (body: any) => Promise<Usuario>;
export declare const comparePassword: (candidate: any, hash: any) => Promise<unknown>;
export declare const getUserByID: (cedula: any) => Promise<{
    cedula: any;
    nombre: any;
    apellido: any;
    direccion: any;
    contra: any;
}>;
//# sourceMappingURL=session.d.ts.map