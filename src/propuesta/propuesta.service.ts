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

    async createPropuesta(titulo: string): Promise<PropuestaEntity> {
        if (!titulo) {
            throw new BadRequestException('Title cannot be empty');
        }

        const album = this.propuestaRepository.create({ titulo });
        return this.propuestaRepository.save(album);
    }

    findPropuestaById(id: number): Promise<PropuestaEntity> {
        return this.propuestaRepository.findOne({where: {id}});
    }

    findAllPropuestas(): Promise<PropuestaEntity[]> {
        return this.propuestaRepository.find();
    }

    async deletePropuesta(id: number): Promise<void> {
        const propuesta = await this.findPropuestaById(id);
        if (propuesta.proyecto) {
            throw new BadRequestException('Cannot delete a proposal with a project');
        }
        await this.propuestaRepository.delete(id);
    }
}
