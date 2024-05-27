import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { ProyectoEstudianteService } from './proyecto-estudiante.service';

@Controller('proyecto')
export class ProyectoEstudianteController {
  constructor(private readonly proyectoEstudianteService: ProyectoEstudianteService) {}

  @Post(':proyectoId/estudiante/:estudianteId')
  async addProyectoEstudiante(
    @Param('proyectoId') proyectoId: number,
    @Param('estudianteId') estudianteId: number,
  ): Promise<string> {
    return this.proyectoEstudianteService.addProyectoEstudiante(proyectoId, estudianteId);
  }

  @Put(':proyectoId/estudiante/:estudianteId')
  async associateProyectoToEstudianteId(           
    @Param('proyectoId') proyectoId: number,
    @Param('estudianteId') estudianteId: number,
  ): Promise<string> {
    return this.proyectoEstudianteService.associateProyectoToEstudianteId(proyectoId, estudianteId);
  }

  @Get('estudiante/:estudianteId/proyecto')
  async findProyectoByEstudianteId(@Param('estudianteId') estudianteId: number): Promise<any> {
    return this.proyectoEstudianteService.findProyectoByEstudianteId(estudianteId);
  }

}
