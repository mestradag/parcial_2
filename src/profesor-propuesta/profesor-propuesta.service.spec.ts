import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorPropuestaService } from './profesor-propuesta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';

describe('ProfesorPropuestaService', () => {
  let service: ProfesorPropuestaService;
  let profesorRepository: Repository<ProfesorEntity>;
  let propuestaRepository: Repository<PropuestaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorPropuestaService,
        {
          provide: getRepositoryToken(ProfesorEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PropuestaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfesorPropuestaService>(ProfesorPropuestaService);
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPropuestaToProfesor', () => {
    it('should add propuesta to profesor', async () => {
      const profesorId = 1;
      const propuestaId = 1;
      const profesor = new ProfesorEntity();
      profesor.id = profesorId;
      const propuesta = new PropuestaEntity();
      propuesta.id = propuestaId;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(propuestaRepository, 'save').mockResolvedValue(propuesta);

      const result = await service.addPropuestaToProfesor(profesorId, propuesta);

      expect(result).toEqual(propuesta);
    });

    it('should throw error if profesor not found', async () => {
      const profesorId = 1;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.addPropuestaToProfesor(profesorId, new PropuestaEntity())).rejects.toThrowError(
        `Profesor with ID ${profesorId} not found.`,
      );
    });
  });

  describe('associatePropuestaToProfesor', () => {
    it('should associate propuesta to profesor', async () => {
      const profesorId = 1;
      const propuestaId = 1;
      const profesor = new ProfesorEntity();
      profesor.id = profesorId;
      const propuesta = new PropuestaEntity();
      propuesta.id = propuestaId;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(propuesta);
      jest.spyOn(profesorRepository, 'save').mockResolvedValue(profesor);

      const result = await service.associatePropuestaToProfesor(profesorId, propuestaId);

      expect(result).toEqual(profesor);
      expect(profesor.propuestas).toContain(propuesta);
    });

    it('should throw error if profesor not found', async () => {
      const profesorId = 1;
      const propuestaId = 1;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.associatePropuestaToProfesor(profesorId, propuestaId)).rejects.toThrowError(
        `Profesor with ID ${profesorId} not found.`,
      );
    });

    it('should throw error if propuesta not found', async () => {
      const profesorId = 1;
      const propuestaId = 1;
      const profesor = new ProfesorEntity();
      profesor.id = profesorId;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.associatePropuestaToProfesor(profesorId, propuestaId)).rejects.toThrowError(
        `Propuesta with ID ${propuestaId} not found.`,
      );
    });
  });

  describe('findPropuestasByProfesorId', () => {
    it('should find propuestas by profesor id', async () => {
      const profesorId = 1;
      const profesor = new ProfesorEntity();
      profesor.id = profesorId;
      const propuestas = [new PropuestaEntity(), new PropuestaEntity()];

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(propuestaRepository, 'find').mockResolvedValue(propuestas);

      const result = await service.findPropuestasByProfesorId(profesorId);

      expect(result).toEqual(propuestas);
    });

    it('should throw error if profesor not found', async () => {
      const profesorId = 1;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.findPropuestasByProfesorId(profesorId)).rejects.toThrowError(
        `Profesor with ID ${profesorId} not found.`,
      );
    });
  });

  describe('deletePropuestaProfesor', () => {
    it('should delete propuesta from profesor', async () => {
      const profesorId = 1;
      const propuestaId = 1;
      const profesor = new ProfesorEntity();
      profesor.id = profesorId;
      const propuesta = new PropuestaEntity();
      propuesta.id = propuestaId;
      profesor.propuestas = [propuesta];

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);
      jest.spyOn(profesorRepository, 'save').mockResolvedValue(profesor);

      await service.deletePropuestaProfesor(profesorId, propuestaId);

      expect(profesor.propuestas).toHaveLength(0);
    });

    it('should throw error if profesor not found', async () => {
      const profesorId = 1;
      const propuestaId = 1;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.deletePropuestaProfesor(profesorId, propuestaId)).rejects.toThrowError(
        `Profesor with ID ${profesorId} not found.`,
      );
    });

    it('should throw error if propuesta not associated with profesor', async () => {
      const profesorId = 1;
      const propuestaId = 1;
      const profesor = new ProfesorEntity();
      profesor.id = profesorId;

      jest.spyOn(profesorRepository, 'findOne').mockResolvedValue(profesor);

      await expect(service.deletePropuestaProfesor(profesorId, propuestaId)).rejects.toThrowError(
        `Propuesta with ID ${propuestaId} not associated with Profesor with ID ${profesorId}.`,
      );
    });
  });
});

