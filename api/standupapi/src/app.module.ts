import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { StandupController } from './controllers/standup/standup.controller';
import { AuthService } from './services/auth/auth.service';
import { StandupService } from './services/standup/standup.service';
import { UserService } from './services/user/user.service';
import { StandupUpdateService } from './services/standup-updates/standup-updates.service';
import { StandupUserService } from './services/standup-user/standup-user.service';
import { AuthModuleModule } from './auth/auth-module.module';

@Module({
  imports: [AuthModuleModule],
  controllers: [StandupController],
  providers: [PrismaService, AuthService, StandupService, UserService, StandupUpdateService, StandupUserService],
})
export class AppModule {}
