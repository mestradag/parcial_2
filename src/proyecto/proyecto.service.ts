import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegExpOrString, Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';

@Injectable()
export class ProyectoService {

    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>,
        
    ){}

    async createProyecto(fechaInicio: Date, fechaFin: Date, url:string): Promise<ProyectoEntity> {
        if (!fechaInicio || !fechaFin || fechaInicio > fechaFin) {
            throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
        }

        const proyecto = this.proyectoRepository.create({ fechaInicio, fechaFin, url });
        return this.proyectoRepository.save(proyecto);
    }

}
