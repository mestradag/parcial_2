/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

export class PropuestaDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    palabraClave: string;

    @IsNotEmpty()
    proyecto: ProyectoEntity;

    @IsNotEmpty()
    profesor: ProfesorEntity;

    /*
    constructor(data: PropuestaDTO) {
        this.id = data.id;
        this.titulo = data.titulo;
        this.descripcion = data.descripcion;
        this.palabraClave = data.palabraClave;
        this.proyecto = data.proyecto;
        this.profesor = data.profesor;
    }*/
}
