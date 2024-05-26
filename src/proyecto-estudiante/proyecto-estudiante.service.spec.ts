import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEstudianteService } from './proyecto-estudiante.service';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

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
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      const mockEstudiante = new EstudianteEntity();
      mockEstudiante.id = 1;
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(mockEstudiante);

      const result = await service.addProyectoEstudiante(1, 1);

      expect(result).toEqual(`Student with ID ${mockEstudiante.id} successfully associated with Proyecto with ID ${mockProyecto.id}.`);
    });

    it('should throw an error if project is not found', async () => {
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.addProyectoEstudiante(1, 1)).rejects.toThrowError('Proyecto with ID 1 not found.');
    });

    it('should throw an error if student is not found', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.addProyectoEstudiante(1, 1)).rejects.toThrowError('Estudiante with ID 1 not found.');
    });

    it('should throw an error if project already has an associated student', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      mockProyecto.estudiante = new EstudianteEntity(); // Simulate project already having an associated student
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      const mockEstudiante = new EstudianteEntity();
      mockEstudiante.id = 1;
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(mockEstudiante);

      await expect(service.addProyectoEstudiante(1, 1)).rejects.toThrowError('Proyecto with ID 1 already has an associated student.');
    });
  });

  describe('associateProyectoToEstudianteId', () => {
    it('should associate a student to a project', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      const mockEstudiante = new EstudianteEntity();
      mockEstudiante.id = 1;
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(mockEstudiante);

      const result = await service.associateProyectoToEstudianteId(1, 1);

      expect(result).toEqual(`Estudiante with ID ${mockEstudiante.id} successfully associated with Proyecto with ID ${mockProyecto.id}.`);
    });

    it('should throw an error if project is not found', async () => {
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.associateProyectoToEstudianteId(1, 1)).rejects.toThrowError('Proyecto with ID 1 not found.');
    });

    it('should throw an error if student is not found', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.associateProyectoToEstudianteId(1, 1)).rejects.toThrowError('Estudiante with ID 1 not found.');
    });
  });
  describe('findProyectoByEstudianteId', () => {
    it('should return the project associated with a student', async () => {
      const mockEstudiante = new EstudianteEntity();
      mockEstudiante.id = 1;
      mockEstudiante.proyecto = new ProyectoEntity(); // Simulate student having an associated project
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(mockEstudiante);

      const result = await service.findProyectoByEstudianteId(1);

      expect(result).toEqual(mockEstudiante.proyecto);
    });

    it('should throw an error if student is not found', async () => {
      jest.spyOn(estudianteRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findProyectoByEstudianteId(1)).rejects.toThrowError('Estudiante with ID 1 not found.');
    });
  });

  describe('deleteProyectoIdEstudianteId', () => {
    it('should disassociate a student from a project', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      const mockEstudiante = new EstudianteEntity();
      mockEstudiante.id = 1;
      mockEstudiante.proyecto = mockProyecto; // Simulate student having an associated project
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      const result = await service.deleteProyectoIdEstudianteId(1, 1);

      expect(result).toEqual(`Estudiante disassociated from Proyecto with ID ${mockProyecto.id} successfully.`);
    });

    it('should throw an error if project is not found', async () => {
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.deleteProyectoIdEstudianteId(1, 1)).rejects.toThrowError('Proyecto with ID 1 not found.');
    });

    it('should throw an error if no student is associated with the project', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      await expect(service.deleteProyectoIdEstudianteId(1, 1)).rejects.toThrowError(`No student associated with Proyecto with ID ${mockProyecto.id}.`);
    });

    it('should throw an error if student associated with project does not match provided student ID', async () => {
      const mockProyecto = new ProyectoEntity();
      mockProyecto.id = 1;
      const mockEstudiante = new EstudianteEntity();
      mockEstudiante.id = 1;
      mockEstudiante.proyecto = mockProyecto; // Simulate student having an associated project
      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValueOnce(mockProyecto);

      await expect(service.deleteProyectoIdEstudianteId(1, 2)).rejects.toThrowError(`No student associated with Proyecto with ID ${mockProyecto.id} and Estudiante with ID 2.`);
    });
  });
});
