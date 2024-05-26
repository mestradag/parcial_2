import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';
import { ProyectoPropuestaService } from './proyecto-propuesta.service';
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

  describe('addProyectoPropuesta', () => {
    it('should add a proposal to a project', async () => {
      const proyecto = new ProyectoEntity();
      const propuestaId = 1;
      const propuesta = new PropuestaEntity();
      propuesta.id = propuestaId;

      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(propuesta);
      jest.spyOn(proyectoRepository, 'save').mockResolvedValue(proyecto);

      const result = await service.addProyectoPropuesta(proyecto, propuestaId);
      expect(result).toBe(proyecto);
      expect(result.propuesta).toBe(propuesta);
    });

    it('should throw an error if proposal not found', async () => {
      const proyecto = new ProyectoEntity();
      const propuestaId = 1;

      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.addProyectoPropuesta(proyecto, propuestaId)).rejects.toThrow(`Propuesta with ID ${propuestaId} not found.`);
    });
  });

  describe('associateProyectoIdToPropuestaId', () => {
    it('should associate a proposal to a project', async () => {
      const proyectoId = 1;
      const propuestaId = 1;
      const proyecto = new ProyectoEntity();
      const propuesta = new PropuestaEntity();
      proyecto.id = proyectoId;
      propuesta.id = propuestaId;

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(proyecto);
      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(propuesta);
      jest.spyOn(proyectoRepository, 'save').mockResolvedValue(proyecto);

      const result = await service.associateProyectoIdToPropuestaId(proyectoId, propuestaId);
      expect(result).toBe(`Propuesta with ID ${propuestaId} successfully associated with Proyecto with ID ${proyectoId}.`);
    });

    it('should throw an error if project not found', async () => {
      const proyectoId = 1;
      const propuestaId = 1;

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.associateProyectoIdToPropuestaId(proyectoId, propuestaId)).rejects.toThrow(`Proyecto with ID ${proyectoId} not found.`);
    });

    it('should throw an error if proposal not found', async () => {
      const proyectoId = 1;
      const propuestaId = 1;
      const proyecto = new ProyectoEntity();

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(proyecto);
      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.associateProyectoIdToPropuestaId(proyectoId, propuestaId)).rejects.toThrow(`Propuesta with ID ${propuestaId} not found.`);
    });
  });

  describe('findProyectoByPropuestaId', () => {
    it('should find a project by proposal ID', async () => {
      const propuestaId = 1;
      const proyecto = new ProyectoEntity();
      const propuesta = new PropuestaEntity();
      propuesta.id = propuestaId;
      propuesta.proyecto = proyecto;

      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(propuesta);

      const result = await service.findProyectoByPropuestaId(propuestaId);
      expect(result).toBe(proyecto);
    });

    it('should throw an error if proposal not found', async () => {
      const propuestaId = 1;

      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findProyectoByPropuestaId(propuestaId)).rejects.toThrow(`Propuesta with ID ${propuestaId} not found.`);
    });
  });

  describe('deleteProyectoIdPropuestaId', () => {
    it('should disassociate a proposal from a project', async () => {
      const proyectoId = 1;
      const proyecto = new ProyectoEntity();
      proyecto.id = proyectoId;
      proyecto.propuesta = new PropuestaEntity();

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(proyecto);
      jest.spyOn(proyectoRepository, 'save').mockResolvedValue(proyecto);

      const result = await service.deleteProyectoIdPropuestaId(proyectoId);
      expect(result).toBe(`Propuesta disassociated from Proyecto with ID ${proyectoId} successfully.`);
      expect(proyecto.propuesta).toBeNull();
    });

    it('should throw an error if project not found', async () => {
      const proyectoId = 1;

      jest.spyOn(proyectoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteProyectoIdPropuestaId(proyectoId)).rejects.toThrow(`Proyecto with ID ${proyectoId} not found.`);
    });
  });
});

