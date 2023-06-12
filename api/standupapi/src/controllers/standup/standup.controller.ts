import { Prisma, Standup, StandupUpdate } from '.prisma/client';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { createStandupUpdateRequestDto } from 'src/models/standup-update/create-standup-update.dto';
import { createStandupRequestDto } from 'src/models/standup/create-standup.dto';
import { updateStandupRequestDto } from 'src/models/standup/update-standup.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { StandupUpdateService } from 'src/services/standup-updates/standup-updates.service';
import { StandupUserService } from 'src/services/standup-user/standup-user.service';
import { StandupService } from 'src/services/standup/standup.service';
import { UserService } from 'src/services/user/user.service';

@Controller('standup')
export class StandupController {
    constructor(private authService: AuthService, private standupService: StandupService, 
        private userService: UserService, private standupUpdateService: StandupUpdateService,
        private standupUserService: StandupUserService){}
    
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

    @Put(":id")
    async updateStandup(@Param('id') id : number, @Body() data: updateStandupRequestDto): Promise<Standup> {
        const currentAuth0Id = this.authService.currentUserAuth0Id;
        const userId = (await this.userService.getUserByAuth0Id(currentAuth0Id)).id;
        
        //add validation to see if user belongs to standup
        return this.standupService.updateStandup({
            where: {
                id: id
            },
            data: {
                title: data.title,
                description: data.description,
                disabled: data.disabled,
                
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

    @Get(":id/updates")
    async getStandupUpdates(@Param('id') id:number, @Body() date: Date) {
        //adjust local datetimes to utc
        return this.standupUpdateService.getStandupUpdates({
            where: {
                standupUser:{
                    standupId:id,
                },
                createdDate: date,
            }
        });
    }

    @Post(":id/updates")
    async createStandupUpdate(@Param('id') standupId: number, @Body() dto:createStandupUpdateRequestDto): Promise<StandupUpdate> {
        const currentAuth0Id = this.authService.currentUserAuth0Id;
        //Return not found error
        const userId = (await this.userService.getUserByAuth0Id(currentAuth0Id)).id;
        const standupUserId = (await this.standupUserService.getStandupUser(
        {
            where:{
                standupId: standupId,
                userId: userId
            }
        }))?.id || 0;

        //Return not found error
        if(standupUserId == 0){
            return ;
        }

        const data : Prisma.StandupUpdateCreateInput = {
            ...dto,
            standupUser:{
                connect:{
                    id: standupUserId
                }
            }
            
        };
        return this.standupUpdateService.createStandupUpdate(data);
    }

}
