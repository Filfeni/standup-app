import { Injectable } from '@nestjs/common';
import { Prisma, StandupUpdate } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandupUpdateService {
    constructor(private prisma: PrismaService) {}
    async getStandupUpdates(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.StandupUpdateWhereUniqueInput;
        where?: Prisma.StandupUpdateWhereInput;
        orderBy?: Prisma.StandupUpdateOrderByWithRelationInput;
      }): Promise<StandupUpdate[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.standupUpdate.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy,
        });
    }

    async createStandupUpdate(data: Prisma.StandupUpdateCreateInput): Promise<StandupUpdate> {
        return this.prisma.standupUpdate.create({
            data,
        });
    }

    async updateStandupUpdate(params: {
      where: Prisma.StandupUpdateWhereUniqueInput;
      data: Prisma.StandupUpdateUpdateInput
    }) {
      const {where, data} = params;
      return this.prisma.standup.update({
        where,
        data
      });
    }
}
