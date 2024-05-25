import { Module } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaController } from './propuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  providers: [PropuestaService],
  controllers: [PropuestaController]
})
export class PropuestaModule {}
