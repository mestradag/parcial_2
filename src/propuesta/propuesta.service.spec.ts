import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let propuestaRepository: Repository<PropuestaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(PropuestaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPropuesta', () => {
    it('should create a new proposal successfully', async () => {
      const propuestaData = {
        titulo: 'New Proposal',
        descripcion: 'Description of the new proposal',
        palabraClave: 'keyword',
      };
      const savedPropuesta = {
        id: 1,
        ...propuestaData,
      };

      jest.spyOn(propuestaRepository, 'create').mockReturnValue(propuestaData as any);
      jest.spyOn(propuestaRepository, 'save').mockResolvedValue(savedPropuesta as any);

      const result = await service.createPropuesta(propuestaData.titulo, propuestaData.descripcion, propuestaData.palabraClave);
      expect(result).toEqual(savedPropuesta);
    });

    it('should throw an error if the title or description is empty', async () => {
      await expect(service.createPropuesta('', 'Description', 'keyword')).rejects.toThrow(BadRequestException);
      await expect(service.createPropuesta('Title', '', 'keyword')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findPropuestaById', () => {
    it('should return a proposal by ID', async () => {
      const propuestaData = {
        id: 1,
        titulo: 'Proposal Title',
        descripcion: 'Proposal Description',
        palabraClave: 'keyword',
      };

      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(propuestaData as any);

      const result = await service.findPropuestaById(propuestaData.id);
      expect(result).toEqual(propuestaData);
    });

    it('should throw an error if proposal not found', async () => {
      jest.spyOn(propuestaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findPropuestaById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllPropuestas', () => {
    it('should return all proposals', async () => {
      const propuestasData = [
        {
          id: 1,
          titulo: 'Proposal Title 1',
          descripcion: 'Proposal Description 1',
          palabraClave: 'keyword1',
        },
        {
          id: 2,
          titulo: 'Proposal Title 2',
          descripcion: 'Proposal Description 2',
          palabraClave: 'keyword2',
        },
      ];

      jest.spyOn(propuestaRepository, 'find').mockResolvedValue(propuestasData as any);

      const result = await service.findAllPropuestas();
      expect(result).toEqual(propuestasData);
    });

    it('should throw an error if no proposals are found', async () => {
      jest.spyOn(propuestaRepository, 'find').mockResolvedValue([]);

      await expect(service.findAllPropuestas()).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePropuesta', () => {
    it('should delete a proposal successfully', async () => {
      const propuestaData = {
        id: 1,
        titulo: 'Proposal Title',
        descripcion: 'Proposal Description',
        palabraClave: 'keyword',
        proyecto: null,
      };

      jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuestaData as any);
      jest.spyOn(propuestaRepository, 'delete').mockResolvedValue(undefined);

      const result = await service.deletePropuesta(propuestaData.id);
      expect(result).toEqual({ message: 'Propuesta eliminada exitosamente' });
    });

    it('should throw an error if trying to delete a proposal associated with a project', async () => {
      const propuestaData = {
        id: 1,
        titulo: 'Proposal Title',
        descripcion: 'Proposal Description',
        palabraClave: 'keyword',
        proyecto: { id: 1 },
      };

      jest.spyOn(service, 'findPropuestaById').mockResolvedValue(propuestaData as any);

      await expect(service.deletePropuesta(propuestaData.id)).rejects.toThrow(BadRequestException);
    });
  });
});
