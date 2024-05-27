import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepository: Repository<EstudianteEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEstudiante', () => {
    it('should create a new student successfully', async () => {
      const estudianteData = {
        nombre: 'John Doe',
        codigo: '1234567890',
        numCreditosA: 20,
      };
      const savedEstudiante = {
        id: 1,
        ...estudianteData,
      };

      jest.spyOn(estudianteRepository, 'create').mockReturnValue(estudianteData as any);
      jest.spyOn(estudianteRepository, 'save').mockResolvedValue(savedEstudiante as any);

      const result = await service.createEstudiante(estudianteData.nombre, estudianteData.codigo, estudianteData.numCreditosA);
      expect(result).toEqual(savedEstudiante);
    });

    it('should throw an error if the student code is not exactly 10 characters', async () => {
      const estudianteData = {
        nombre: 'John Doe',
        codigo: '12345678', // Incorrect length
        numCreditosA: 20,
      };

      await expect(
        service.createEstudiante(estudianteData.nombre, estudianteData.codigo, estudianteData.numCreditosA)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findEstudianteById', () => {
    it('should return a student by ID', async () => {
      const estudianteData = {
        id: 1,
        nombre: 'John Doe',
        codigo: '1234567890',
        numCreditosA: 20,
        proyecto: null,
      };

      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValue(estudianteData as any);

      const result = await service.findEstudianteById(estudianteData.id);
      expect(result).toEqual(estudianteData);
    });

    it('should throw an error if student not found', async () => {
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findEstudianteById(1)).rejects.toThrow(NotFoundException);
    });
  });
});
