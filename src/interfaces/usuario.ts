export interface Usuario {
  alias: number;
  correo: string;
  descripcion: string;
}

export interface UsuarioCompleto extends Usuario {
  contrasenia?: string;
}
