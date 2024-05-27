import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Injectable()
export class ProyectoEstudianteService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async addProyectoEstudiante(proyectoId: number, estudianteId: number): Promise<string> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: proyectoId }, relations: ['estudiante'] });
    if (!proyecto) {
      throw new Error(`Proyecto with ID ${proyectoId} not found.`);
    }
    
    const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId } });
    if (!estudiante) {
      throw new Error(`Estudiante with ID ${estudianteId} not found.`);
    }
    
    if (proyecto.estudiante) {
      throw new Error(`Proyecto with ID ${proyectoId} already has an associated student.`);
    }
    
    proyecto.estudiante = estudiante;
    await this.proyectoRepository.save(proyecto);
    return `Student with ID ${estudianteId} successfully associated with Proyecto with ID ${proyectoId}.`;
  }
  

  async associateProyectoToEstudianteId(proyectoId: number, estudianteId: number): Promise<string> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: proyectoId } });
    if (!proyecto) {
      throw new Error(`Proyecto with ID ${proyectoId} not found.`);
    }
    const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId } });
    if (!estudiante) {
      throw new Error(`Estudiante with ID ${estudianteId} not found.`);
    }
    proyecto.estudiante = estudiante;
    await this.proyectoRepository.save(proyecto);
    return `Estudiante with ID ${estudianteId} successfully associated with Proyecto with ID ${proyectoId}.`;
  }

  async findProyectoByEstudianteId(estudianteId: number): Promise<ProyectoEntity> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId }, relations: ['proyecto'] });
    if (!estudiante) {
      throw new Error(`Estudiante with ID ${estudianteId} not found.`);
    }
    return estudiante.proyecto;
  }

}
