import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';

@Injectable()
export class ProfesorPropuestaService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
    @InjectRepository(PropuestaEntity)
    private readonly propuestaRepository: Repository<PropuestaEntity>,
  ) {}

  async addPropuestaToProfesor(profesorId: number, propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    const profesor = await this.profesorRepository.findOne({where: {id: profesorId},  relations: ['propuestas'] });
    if (!profesor) {
      throw new Error(`Profesor with ID ${profesorId} not found.`);
    }
    propuesta.profesor = profesor;
    return await this.propuestaRepository.save(propuesta);
  }

  async associatePropuestaToProfesor(profesorId: number, propuestaId: number): Promise<string> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['propuestas'] });
    if (!profesor) {
        throw new NotFoundException(`Profesor with ID ${profesorId} not found.`);
    }
    
    const propuesta = await this.propuestaRepository.findOne({ where: { id: propuestaId } });
    if (!propuesta) {
        throw new NotFoundException(`Propuesta with ID ${propuestaId} not found.`);
    }

    // Asociar la propuesta al profesor
    profesor.propuestas = [...profesor.propuestas, propuesta];
    await this.profesorRepository.save(profesor);

    return `Propuesta with ID ${propuestaId} successfully associated with Profesor with ID ${profesorId}.`;
  }

  async findPropuestasByProfesorId(profesorId: number): Promise<PropuestaEntity[]> {
    const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['propuestas'] });
    if (!profesor) {
      throw new Error(`Profesor with ID ${profesorId} not found.`);
    }
    return profesor.propuestas;
  }


    async deletePropuestaProfesor(profesorId: number, propuestaId: number): Promise<void> {
      const profesor = await this.profesorRepository.findOne({ where: { id: profesorId }, relations: ['propuestas'] });
      if (!profesor) {
          throw new Error(`Profesor with ID ${profesorId} not found.`);
      }

      // Encontrar el índice de la propuesta en la lista de propuestas del profesor
      const propuestaIndex = profesor.propuestas.findIndex(propuesta => propuesta.id === propuestaId);
      if (propuestaIndex === -1) {
          throw new Error(`Propuesta with ID ${propuestaId} not associated with Profesor with ID ${profesorId}.`);
      }

      // Eliminar la propuesta de la lista de propuestas del profesor
      profesor.propuestas.splice(propuestaIndex, 1);

      // Guardar los cambios en la base de datos
      await this.profesorRepository.save(profesor);
  }


}
