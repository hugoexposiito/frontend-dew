import type { Usuario } from './usuario';

export interface LoginDatos {
    email: string;
    password: string;
}

export interface LoginRespuesta {
    mensaje: string;
    token: string;
    expiresIn: string;
}

export interface AuthContextType {
    usuario: Usuario | null;
    token: string | null;
    estaAutenticado: boolean;
    cargando: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}