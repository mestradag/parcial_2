import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegExpOrString, Repository } from 'typeorm'; 
import { ProfesorEntity } from './profesor.entity';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
        
    ){}

    async crearProfesor(cedula:number, nombre:string, grupoInvestigacion: string, numeroExtension: number): Promise<ProfesorEntity> {

        if (grupoInvestigacion != 'TICSW' && grupoInvestigacion != 'IMAGINE' && grupoInvestigacion != 'COMIT') {
            throw new BadRequestException('El grupo de investigacion debe ser TICSW, IMAGINE o COMIT');
        }

        const profesor = this.profesorRepository.create({ cedula, nombre, grupoInvestigacion, numeroExtension});
        return this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: number): Promise<ProfesorEntity> {
        return this.profesorRepository.findOne({where: {id}});
    }

    async deleteProfesor(id: number): Promise<{ message: string }> {
        const profesor = await this.findProfesorById(id);
        if (profesor.propuestas) {
            throw new BadRequestException('No se puede eliminar un profesor con una propuesta que tiene un proyecto asociado');
        }
        await this.profesorRepository.delete(id);
        return { message: 'Propuesta eliminada exitosamente' };
    }

    async eliminarProfesor(cedula: number): Promise<{ message: string }> {
        const profesor = await this.profesorRepository.findOne({ where: { cedula } });
        if (profesor.propuestas) {
            throw new BadRequestException('No se puede eliminar un profesor con una propuesta que tiene un proyecto asociado');
        }
        await this.profesorRepository.delete(profesor);
        return { message: 'Propuesta eliminada exitosamente' };
    }

}
