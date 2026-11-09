export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    fechaNacimiento?: string | null;
    activo?: boolean;
}