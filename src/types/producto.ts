export interface Producto {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    stock: number;
    fechaLanzamiento: string | null;
    activo: boolean;
}