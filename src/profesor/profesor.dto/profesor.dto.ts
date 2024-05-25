/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';

export class ProfesorDTO {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    cedula: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    grupoInvestigacion: string;

    @IsNotEmpty()
    @IsNumber()
    numeroExtension: number;

    @IsNotEmpty()
    propuesta: PropuestaEntity[];

    /*
    constructor(data: ProfesorDTO) {
        this.id = data.id;
        this.cedula = data.cedula;
        this.nombre = data.nombre;
        this.grupoInvestigacion = data.grupoInvestigacion;
        this.numeroExtension = data.numeroExtension;
        this.propuesta = data.propuesta;
    }*/
}
