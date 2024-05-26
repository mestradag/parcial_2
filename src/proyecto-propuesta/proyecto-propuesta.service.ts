import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

@Injectable()
export class ProyectoPropuestaService {
  constructor(
    @InjectRepository(PropuestaEntity)
    private readonly propuestaRepository: Repository<PropuestaEntity>,
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}

  async addProyectoPropuesta(proyectoId: number, propuestaId: number): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: proyectoId } });
    if (!proyecto) {
      throw new Error(`Proyecto with ID ${proyectoId} not found.`);
    }
    const propuesta = await this.propuestaRepository.findOne({ where: { id: propuestaId } });
    if (!propuesta) {
      throw new Error(`Propuesta with ID ${propuestaId} not found.`);
    }
    proyecto.propuesta = propuesta;
    return await this.proyectoRepository.save(proyecto);
  }
  

  async associateProyectoIdToPropuestaId(proyectoId: number, propuestaId: number): Promise<string> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: proyectoId } });
    if (!proyecto) {
      throw new Error(`Proyecto with ID ${proyectoId} not found.`);
    }
    const propuesta = await this.propuestaRepository.findOne({ where: { id: propuestaId } });
    if (!propuesta) {
      throw new Error(`Propuesta with ID ${propuestaId} not found.`);
    }
    
    // Asociar la propuesta al proyecto
    proyecto.propuesta = propuesta;
    await this.proyectoRepository.save(proyecto);
    
    // Asociar el proyecto a la propuesta
    propuesta.proyecto = proyecto;
    await this.propuestaRepository.save(propuesta);
    
    return `Propuesta with ID ${propuestaId} successfully associated with Proyecto with ID ${proyectoId}.`;
    }

  async findProyectoByPropuestaId(propuestaId: number): Promise<ProyectoEntity> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id: propuestaId }, relations: ['proyecto'] });
    if (!propuesta) {
      throw new Error(`Propuesta with ID ${propuestaId} not found.`);
    }
    return propuesta.proyecto;
  }

  async deleteProyectoIdPropuestaId(proyectoId: number, propuestaId: number): Promise<string> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id: proyectoId }, relations: ['propuesta'] });
    if (!proyecto) {
        throw new Error(`Proyecto with ID ${proyectoId} not found.`);
    }
    
    // Verificar si el proyecto tiene una propuesta asociada
    if (!proyecto.propuesta || proyecto.propuesta.id !== propuestaId) {
        throw new Error(`Propuesta with ID ${propuestaId} is not associated with Proyecto with ID ${proyectoId}.`);
    }
    
    // Desasociar la propuesta del proyecto
    proyecto.propuesta = null;
    await this.proyectoRepository.save(proyecto);
    
    // Desasociar el proyecto de la propuesta
    const propuesta = await this.propuestaRepository.findOne({ where: { id: propuestaId } });
    if (!propuesta) {
        throw new Error(`Propuesta with ID ${propuestaId} not found.`);
    }
    propuesta.proyecto = null;
    await this.propuestaRepository.save(propuesta);
    
    return `Propuesta disassociated from Proyecto with ID ${proyectoId} successfully.`;
}


  
}
