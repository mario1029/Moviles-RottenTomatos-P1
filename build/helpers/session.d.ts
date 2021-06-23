export function signUpUser(body: any): Promise<{
    cedula: any;
    nombre: any;
    apellido: any;
    direccion: any;
    contra: any;
}>;
export function comparePassword(candidate: any, hash: any): Promise<any>;
export function getUserByID(cedula: any): Promise<any>;
//# sourceMappingURL=session.d.ts.map