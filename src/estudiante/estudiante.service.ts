import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { EstudianteEntity } from './estudiante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>,
    ){}

    async createEstudiante(
        nombre: string,
        codigo: string,
        numCreditosA: number
    ): Promise<EstudianteEntity> {
        if (!codigo || codigo.length !== 10) {
            throw new BadRequestException('El código debe tener exactamente 10 caracteres');
        }
        const nuevoEstudiante = this.estudianteRepository.create({ nombre, codigo, numCreditosA});
        return this.estudianteRepository.save(nuevoEstudiante);
    }

    async findEstudianteById(id: number): Promise<EstudianteEntity> {
        const estudiante = await this.estudianteRepository.findOne({ where: { id }, relations: ['proyecto'] });
        if (!estudiante) {
            throw new NotFoundException('Estudiante no encontrado');
        }
        return estudiante;
    }
}
