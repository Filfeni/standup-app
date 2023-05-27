import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async getUserByAuth0Id(auth0Id: string): Promise<User> {
        return this.prismaService.user.findFirst({
            where: {
                auth0Id: auth0Id
            }
        })
    }
}
