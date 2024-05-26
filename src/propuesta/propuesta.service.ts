import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegExpOrString, Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';


@Injectable()
export class PropuestaService {

    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>,
        
    ){}

    async createPropuesta(titulo: string, descripcion:string, palabraClave:string): Promise<PropuestaEntity> {
        if (!titulo || !descripcion) {
            throw new BadRequestException('Title and description cannot be empty');
        }

        const album = this.propuestaRepository.create({ titulo, descripcion, palabraClave});
        return this.propuestaRepository.save(album);
    }

    async findPropuestaById(id: number): Promise<PropuestaEntity> {
        const propuesta = await this.propuestaRepository.findOne({ where: { id } });
        if (!propuesta) {
            throw new NotFoundException('Propuesta no encontrada');
        }
        return propuesta;
    }

    async findAllPropuestas(): Promise<PropuestaEntity[]> {
        const propuestas = await this.propuestaRepository.find();
        if (propuestas.length === 0) {
            throw new NotFoundException('No se encontraron propuestas');
        }
        return propuestas;
    }

    async deletePropuesta(id: number): Promise<{ message: string }> {
        const propuesta = await this.findPropuestaById(id);
        if (propuesta.proyecto) {
            throw new BadRequestException('Cannot delete a proposal with a project');
        }
        await this.propuestaRepository.delete(id);
        return { message: 'Propuesta eliminada exitosamente' };
    }
}
