import { Controller, Post, Get, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async createEstudiante(@Body() estudianteData: { nombre: string, codigo: string, numCreditosA: number}): Promise<EstudianteEntity> {
        try {
            const { nombre, codigo, numCreditosA } = estudianteData;
            if (!nombre || !codigo) {
                throw new HttpException('Nombre y código son campos obligatorios', HttpStatus.BAD_REQUEST);
            }
            
            if (codigo.length !== 10) {
                throw new HttpException('El código debe tener exactamente 10 caracteres', HttpStatus.BAD_REQUEST);
            }

            return await this.estudianteService.createEstudiante(nombre, codigo, numCreditosA);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async findEstudianteById(@Param('id') id: number): Promise<EstudianteEntity> {
        try {
            const estudiante = await this.estudianteService.findEstudianteById(id);
            return estudiante;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
