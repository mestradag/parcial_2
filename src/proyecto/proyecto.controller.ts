import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';

@Controller('proyecto')
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}

    @Post()
    async createProyecto(
        @Body('fechaInicio') fechaInicio: Date,
        @Body('fechaFin') fechaFin: Date
    ): Promise<ProyectoEntity> {
        try {
            return await this.proyectoService.createProyecto(fechaInicio, fechaFin);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
