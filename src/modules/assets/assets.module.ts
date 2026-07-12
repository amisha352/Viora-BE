import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetsController } from './controllers/assets.controller';
import { AssetsService } from './services/assets.service';
import { AssetRepository } from './repositories/asset.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [AssetsController],
  providers: [AssetsService, AssetRepository],
  exports: [AssetsService, AssetRepository],
})
export class AssetsModule {}
