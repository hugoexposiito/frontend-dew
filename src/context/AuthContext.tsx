import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { apiFetch } from '../services/api';
import type { Usuario } from '../types/usuario';
import type { AuthContextType, LoginRespuesta } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem('token')
    );
    const [cargando, setCargando] = useState(true);

    // comprobar  si existe una sesión al abrir la aplicación
    useEffect(() => {
        async function comprobarSesion() {
            const tokenGuardado = localStorage.getItem('token');

            if (!tokenGuardado) {
                setCargando(false);
                return;
            }

            try {
                const respuesta = await apiFetch('/auth/profile') as {
                    usuario: Usuario;
                };

                setToken(tokenGuardado);
                setUsuario(respuesta.usuario);
            } catch {
                localStorage.removeItem('token');
                setToken(null);
                setUsuario(null);
            } finally {
                setCargando(false);
            }
        }

        comprobarSesion();
    }, []);

    // iniciar sesión
    async function login(email: string, password: string) {
        const respuesta = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }) as LoginRespuesta;

        localStorage.setItem('token', respuesta.token);
        setToken(respuesta.token);

        try {
            const perfil = await apiFetch('/auth/profile') as {
                usuario: Usuario;
            };

            setUsuario(perfil.usuario);
        } catch (error) {
            localStorage.removeItem('token');
            setToken(null);
            setUsuario(null);
            throw error;
        }
    }

    // cerrar sesión
    async function logout() {
        try {
            await apiFetch('/auth/logout', {
                method: 'POST',
            });
        } finally {
            localStorage.removeItem('token');
            setToken(null);
            setUsuario(null);
        }
    }

    const valor: AuthContextType = {
        usuario,
        token,
        estaAutenticado: Boolean(usuario && token),
        cargando,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );
}

// hook para utilizar el  contexto
export function useAuth() {
    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error('useAuth debe utilizarse dentro de AuthProvider');
    }

    return contexto;
}