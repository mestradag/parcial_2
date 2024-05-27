/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { PropuestaEntity } from '../../propuesta/propuesta.entity';

export class ProyectoDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsDateString()
    fechaInicio: Date;

    @IsNotEmpty()
    @IsDateString()
    fechaFin: Date;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    estudiante: EstudianteEntity;

    @IsNotEmpty()
    propuesta: PropuestaEntity;

    /*
    constructor(data: ProyectoDTO) {
        this.id = data.id;
        this.fechaInicio = data.fechaInicio;
        this.fechaFin = data.fechaFin;
        this.url = data.url;
        this.estudiante = data.estudiante;
        this.propuesta = data.propuesta;
    }*/
}
