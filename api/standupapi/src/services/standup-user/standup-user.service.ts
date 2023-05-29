import { Injectable } from '@nestjs/common';
import { Prisma, StandupUser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandupUserService {
    constructor(private prisma: PrismaService){}

    async getStandupUser(params:{
        where: Prisma.StandupUserWhereInput
    }): Promise<StandupUser | null> {
        const { where} = params
        return this.prisma.standupUser.findFirst({
          where,
        });
    }
}
