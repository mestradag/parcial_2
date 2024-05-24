import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PropuestaEntity } from './propuesta/propuesta.entity';
import { ProyectoEntity } from './proyecto/proyecto.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { ProyectoController } from './proyecto/proyecto.controller';
import { EstudianteController } from './estudiante/estudiante.controller';
import { ProfesorController } from './profesor/profesor.controller';
import { PropuestaController } from './propuesta/propuesta.controller';
import { ProyectoService } from './proyecto/proyecto.service';
import { EstudianteService } from './estudiante/estudiante.service';
import { ProfesorService } from './profesor/profesor.service';
import { PropuestaService } from './propuesta/propuesta.service';
import { PrfesorPropuestaModule } from './prfesor-propuesta/prfesor-propuesta.module';
import { ProfesorPropuestaModule } from './profesor-propuesta/profesor-propuesta.module';

@Module({
  imports: [ ProfesorModule, EstudianteModule, ProyectoModule, ProfesorModule,                  
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial_2',
    entities: [ ProfesorEntity, EstudianteEntity, ProyectoEntity, PropuestaEntity], 
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }), PrfesorPropuestaModule, ProfesorPropuestaModule,],
  controllers: [AppController, ProyectoController, EstudianteController, ProfesorController, PropuestaController],
  providers: [AppService, ProyectoService, EstudianteService, ProfesorService, PropuestaService],
})
export class AppModule {}
