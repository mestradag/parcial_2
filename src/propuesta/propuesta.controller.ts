import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';

@Controller('propuesta')
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Post()
    async createPropuesta(@Body() titulo: string) {
        return await this.propuestaService.createPropuesta(titulo);
    }

   @Get(':id')
    async findAllPropuestasById(@Param('id') id: number) {
         return await this.propuestaService.findPropuestaById(id);
    }

    @Get()
    async findAllPropuestas() {
        return await this.propuestaService.findAllPropuestas();
    }
    
    @Post('delete/:id') 
    async deletePropuesta(@Param('id') id: number) {
        return await this.propuestaService.deletePropuesta(id);
    }
}
