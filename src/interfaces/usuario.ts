export interface Usuario {
  alias: string;
  correo: string;
  descripcion: string;
}

export interface UsuarioCompleto extends Usuario {
  contrasenia?: string;
}
