import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListAppService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './list.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListRepository]),
    AuthModule,
  ],
  controllers: [ListController],
  providers: [
    {
      provide: 'IListAppService',
      useClass: ListAppService,
    }
  ]
})
export class ListModule {}
