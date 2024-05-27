import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EstudianteModule } from '../estudiante/estudiante.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity, EstudianteModule])],
  providers: [ProyectoService],
  controllers: [ProyectoController]
})
export class ProyectoModule {}
