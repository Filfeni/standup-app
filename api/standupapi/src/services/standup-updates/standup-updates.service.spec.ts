import { Test, TestingModule } from '@nestjs/testing';
import { StandupUpdatesService } from './standup-updates.service';

describe('StandupUpdatesService', () => {
  let service: StandupUpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandupUpdatesService],
    }).compile();

    service = module.get<StandupUpdatesService>(StandupUpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
