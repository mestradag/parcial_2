import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  providers: [ProyectoService],
  controllers: [ProyectoController]
})
export class ProyectoModule {}
