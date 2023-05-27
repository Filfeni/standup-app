import { Injectable } from '@nestjs/common';
import { Prisma, Standup } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandupService {
    constructor(private prisma: PrismaService) {}
    async getStandup(params:{
        where: Prisma.StandupWhereInput
    }): Promise<Standup | null> {
        const { where} = params
        return this.prisma.standup.findFirst({
          where,
        });
    }
    
    async getStandups(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.StandupWhereUniqueInput;
        where?: Prisma.StandupWhereInput;
        orderBy?: Prisma.StandupOrderByWithRelationInput;
      }): Promise<Standup[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.standup.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy,
        });
    }

    async createStandup(data: Prisma.StandupCreateInput): Promise<Standup> {
        return this.prisma.standup.create({
            data,
        });
    }

    async changeDisabledStatus(id: number, disabled: boolean) : boolean {
        this.prisma.standup.update({
            where: {
              id: id,
            },
            data: {
                disabled: disabled
            },
          })
    }
}
