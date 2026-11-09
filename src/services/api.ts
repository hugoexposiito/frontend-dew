const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.error || 'Error en la petición');
    }

    if (respuesta.status === 204) {
        return null;
    }

    return respuesta.json();
}