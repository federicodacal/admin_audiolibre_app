export class Suscripcion 
{
    id: number;
    tipo: string;
    duracion_meses: number;
    porcentaje_plataforma: number;

    constructor(id:number, tipo:string, duracion_meses:number, porcentaje_plataforma:number) 
    {
        this.id = id;
        this.tipo = tipo;
        this.duracion_meses = duracion_meses;
        this.porcentaje_plataforma = porcentaje_plataforma;
    }
}