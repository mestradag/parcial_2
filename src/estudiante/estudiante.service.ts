import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegExpOrString, Repository } from 'typeorm'; 
import { EstudianteEntity } from './estudiante.entity';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
        
    ){}

    async createEstudiante(codigo:string): Promise<EstudianteEntity> {
        if (!codigo || codigo.length == 10) {
            throw new BadRequestException('El codigo debe tener 10 caracteres');
        }

        const libreria = this.estudianteRepository.create({ codigo });
        return this.estudianteRepository.save(libreria);
    }

    async findEstudianteById(id: number): Promise<EstudianteEntity> {
        return this.estudianteRepository.findOne({where: {id}});
    }
}
