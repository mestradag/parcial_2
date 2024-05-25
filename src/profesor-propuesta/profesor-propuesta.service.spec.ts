import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorPropuestaService } from './profesor-propuesta.service';

describe('ProfesorPropuestaService', () => {
  let service: ProfesorPropuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesorPropuestaService],
    }).compile();

    service = module.get<ProfesorPropuestaService>(ProfesorPropuestaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
