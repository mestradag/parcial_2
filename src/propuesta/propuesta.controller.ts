import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';

@Controller('propuestas')
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Post()
    async createPropuesta(@Body() propuestaData: { titulo: string, descripcion: string, palabraClave: string }) {
        const { titulo, descripcion, palabraClave } = propuestaData;
        if (!titulo || !descripcion) {
            throw new HttpException('Title and description cannot be empty', HttpStatus.BAD_REQUEST);
        }
        return await this.propuestaService.createPropuesta(titulo, descripcion, palabraClave);
    }

    @Get(':id')
    async findPropuestasById(@Param('id') id: number) {
        try {
            return await this.propuestaService.findPropuestaById(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAllPropuestas() {
        try {
            return await this.propuestaService.findAllPropuestas();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async deletePropuesta(@Param('id') id: number): Promise<{ message: string }> {
        if (isNaN(id)) {
            throw new HttpException('ID incorrecto', HttpStatus.BAD_REQUEST);
        }

        try {
            await this.propuestaService.deletePropuesta(id);
            return { message: 'Propuesta eliminada correctamente' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
