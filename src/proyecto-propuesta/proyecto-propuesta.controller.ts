import { Controller, Post, Body, Param, Get, Delete, NotFoundException, Put } from '@nestjs/common';
import { ProyectoPropuestaService } from './proyecto-propuesta.service';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

@Controller('proyecto')
export class ProyectoPropuestaController {
  constructor(private readonly proyectoPropuestaService: ProyectoPropuestaService) {}

  @Post(':proyectoId/propuesta/:propuestaId')
  async addProyectoPropuesta(
    @Param('proyectoId') proyectoId: number,
    @Param('propuestaId') propuestaId: number
  ): Promise<ProyectoEntity> {
    return await this.proyectoPropuestaService.addProyectoPropuesta(proyectoId, propuestaId);
  }

  @Put(':proyectoId/propuesta/:propuestaId')
  async associateProyectoIdToPropuestaId(
    @Param('proyectoId') proyectoId: number,
    @Param('propuestaId') propuestaId: number
  ): Promise<string> {
    return await this.proyectoPropuestaService.associateProyectoIdToPropuestaId(proyectoId, propuestaId);
  }

  @Get('propuesta/:propuestaId/proyecto')
  async findProyectoByPropuestaId(@Param('propuestaId') propuestaId: number): Promise<ProyectoEntity> {
    const proyecto = await this.proyectoPropuestaService.findProyectoByPropuestaId(propuestaId);
    if (!proyecto) {
      throw new NotFoundException(`Proyecto not found for Propuesta with ID ${propuestaId}`);
    }
    return proyecto;
  }

  @Delete(':proyectoId/propuesta/:propuestaId')
  async deleteProyectoIdPropuestaId(
    @Param('proyectoId') proyectoId: number,
    @Param('propuestaId') propuestaId: number
  ): Promise<string> {
    return await this.proyectoPropuestaService.deleteProyectoIdPropuestaId(proyectoId, propuestaId);
  }
}
