import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProyecto', () => {
    it('should create a new project successfully', async () => {
      const proyectoData = {
        fechaInicio: new Date('2023-01-01'),
        fechaFin: new Date('2023-12-31'),
        url: 'http://example.com',
      };
      const savedProyecto = {
        id: 1,
        ...proyectoData,
      };

      jest.spyOn(proyectoRepository, 'create').mockReturnValue(proyectoData as any);
      jest.spyOn(proyectoRepository, 'save').mockResolvedValue(savedProyecto as any);

      const result = await service.createProyecto(proyectoData.fechaInicio, proyectoData.fechaFin, proyectoData.url);
      expect(result).toEqual(savedProyecto);
    });

    it('should throw an error if fechaInicio or fechaFin is missing', async () => {
      await expect(service.createProyecto(null, new Date('2023-12-31'), 'http://example.com')).rejects.toThrow(BadRequestException);
      await expect(service.createProyecto(new Date('2023-01-01'), null, 'http://example.com')).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if fechaInicio is after fechaFin', async () => {
      await expect(service.createProyecto(new Date('2024-01-01'), new Date('2023-12-31'), 'http://example.com')).rejects.toThrow(BadRequestException);
    });
  });
});
