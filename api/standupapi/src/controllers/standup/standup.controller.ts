import { Prisma, Standup } from '.prisma/client';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createStandupRequestDto } from 'src/models/standup/create-standup.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { StandupService } from 'src/services/standup/standup.service';
import { UserService } from 'src/services/user/user.service';

@Controller('standup')
export class StandupController {
    constructor(private authService: AuthService, private standupService: StandupService, private userService: UserService){}
    
    @Get()
    async getStandups(): Promise<Standup[]> {
        const currentAuth0Id = this.authService.currentUserAuth0Id;
        const userId = (await this.userService.getUserByAuth0Id(currentAuth0Id)).id;
        return this.standupService.getStandups({
            where: {
                StandupUser:{
                    some: {
                        userId: userId
                    }
                }
            }
        });
    }

    @Get(":id")
    async getStandup(@Param('id') id : number): Promise<Standup> {
        const currentAuth0Id = this.authService.currentUserAuth0Id;
        const userId = (await this.userService.getUserByAuth0Id(currentAuth0Id)).id;
        return this.standupService.getStandup({
            where: {
                id: id,
                StandupUser:{
                    some: {
                        userId: userId
                    }
                }
            }
        });
    }

    @Patch(":id/disabled/:disabled")
    async changeDisabledStatusStandup(@Param('id') id : number, @Param('disabled') disabled : boolean): Promise<any> {
        const currentAuth0Id = this.authService.currentUserAuth0Id;
        const userId = (await this.userService.getUserByAuth0Id(currentAuth0Id)).id;
        const standup = await this.standupService.getStandup({
            where: {
                id: id,
                createdBy: userId
            }
        });
        if(!standup) return HttpCode(HttpStatus.BAD_REQUEST);
        await this.standupService.changeDisabledStatus(id, disabled);
        return HttpCode(HttpStatus.OK);
    }

    @Post()
    async createStandup(@Body() dto:createStandupRequestDto): Promise<Standup> {
        const currentAuth0Id = this.authService.currentUserAuth0Id;
        const userId = (await this.userService.getUserByAuth0Id(currentAuth0Id)).id;
        const data : Prisma.StandupCreateInput = {
            ...dto, 
            createdBy: userId
        };
        return this.standupService.createStandup(data);
    }
}
