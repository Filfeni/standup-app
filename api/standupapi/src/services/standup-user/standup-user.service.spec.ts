import { Test, TestingModule } from '@nestjs/testing';
import { StandupUserService } from './standup-user.service';

describe('StandupUserService', () => {
  let service: StandupUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandupUserService],
    }).compile();

    service = module.get<StandupUserService>(StandupUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
