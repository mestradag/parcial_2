/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

export class EstudianteDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    codigo: string;

    @IsNotEmpty()
    @IsNumber()
    numCreditosA: number;

    @IsNotEmpty()
    proyecto: ProyectoEntity;

    /*
    constructor(data: EstudianteDTO) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.codigo = data.codigo;
        this.numCreditosA = data.numCreditosA;
        this.proyecto = data.proyecto;
    }*/
}
