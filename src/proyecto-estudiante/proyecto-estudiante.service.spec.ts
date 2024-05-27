import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEstudianteService } from './proyecto-estudiante.service';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

describe('ProyectoEstudianteService', () => {
  let service: ProyectoEstudianteService;
  let proyectoRepository: Repository<ProyectoEntity>;
  let estudianteRepository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoEstudianteService,
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(EstudianteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoEstudianteService>(ProyectoEstudianteService);
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addProyectoEstudiante', () => {
    it('should add a student to a project', async () => {
      const proyecto = { id: 1, estudiante: null } as ProyectoEntity;
      const estudiante = { id: 2 } as EstudianteEntity;

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(proyecto);
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(estudiante);
      jest.spyOn(proyectoRepository, 'save').mockResolvedValueOnce({ ...proyecto, estudiante });

      const result = await service.addProyectoEstudiante(1, 2);
      expect(result).toEqual(`Student with ID 2 successfully associated with Proyecto with ID 1.`);
    });

    it('should throw an error if project is not found', async () => {
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.addProyectoEstudiante(1, 2)).rejects.toThrow('Proyecto with ID 1 not found.');
    });

    it('should throw an error if student is not found', async () => {
      const proyecto = { id: 1, estudiante: null } as ProyectoEntity;

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(proyecto);
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.addProyectoEstudiante(1, 2)).rejects.toThrow('Estudiante with ID 2 not found.');
    });
  });

  describe('associateProyectoToEstudianteId', () => {
    it('should associate a student to a project', async () => {
      const mockProyecto = { id: 1 } as ProyectoEntity;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      const mockEstudiante = { id: 1 } as EstudianteEntity;
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(mockEstudiante);

      mockProyecto.estudiante = mockEstudiante;
      jest.spyOn(proyectoRepository, 'save').mockResolvedValueOnce(mockProyecto);

      const result = await service.associateProyectoToEstudianteId(1, 1);

      expect(result).toEqual(`Estudiante with ID ${mockEstudiante.id} successfully associated with Proyecto with ID ${mockProyecto.id}.`);
    });

    it('should throw an error if project is not found', async () => {
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.associateProyectoToEstudianteId(1, 1)).rejects.toThrowError('Proyecto with ID 1 not found.');
    });

    it('should throw an error if student is not found', async () => {
      const mockProyecto = { id: 1 } as ProyectoEntity;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.associateProyectoToEstudianteId(1, 1)).rejects.toThrowError('Estudiante with ID 1 not found.');
    });
  });

  describe('findProyectoByEstudianteId', () => {
    it('should return the project associated with a student', async () => {
      const mockEstudiante = { id: 1, proyecto: { id: 2 } } as EstudianteEntity;
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(mockEstudiante);

      const result = await service.findProyectoByEstudianteId(1);

      expect(result).toEqual(mockEstudiante.proyecto);
    });

    it('should throw an error if student is not found', async () => {
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findProyectoByEstudianteId(1)).rejects.toThrowError('Estudiante with ID 1 not found.');
    });
  });

});
