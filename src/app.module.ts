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

@Module({
  imports: [ ProfesorModule, EstudianteModule, ProyectoModule, ProfesorModule,                  //Aqui se pone el resto de los modulos
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial_2',
    entities: [ ProfesorEntity, EstudianteEntity, ProyectoEntity, PropuestaEntity], //Aqui se ponen las entities
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
