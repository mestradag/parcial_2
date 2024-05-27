import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoPropuestaService } from './proyecto-propuesta.service';
import { PropuestaEntity } from '../propuesta/propuesta.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProyectoPropuestaService', () => {
  let service: ProyectoPropuestaService;
  let propuestaRepository: Repository<PropuestaEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoPropuestaService,
        {
          provide: getRepositoryToken(PropuestaEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoPropuestaService>(ProyectoPropuestaService);
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
