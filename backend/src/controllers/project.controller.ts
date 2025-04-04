import projectService, { ProjectReqDTO, ProjectRespDTO } from '../services/project.service';
import jwt from 'jsonwebtoken';
import { Get, Route, Post, Body, Path, Put, Query, Request } from 'tsoa';
import { Request as ExpressRequest } from 'express';

@Route('projects')
export class ProjectController {

    @Get('/')
    public async getAllProjects(@Request() req: ExpressRequest): Promise<ProjectRespDTO[]> {
        
        const authHeader = req.headers.authorization;

        let userShare: number | undefined;

        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1];
                // Try with regular JWT secret
                try {
                    const decodedToken = jwt.verify(token, 'your_jwt_secret') as { userShare?: number };
                    userShare = decodedToken.userShare;
                } catch {} // Ignore errors for first secret
                
                // If userShare not found, try with biometric secret
                if (userShare === undefined) {
                    try {
                        const decodedToken = jwt.verify(token, 'your_biometric_secret') as { userShare?: number };
                        userShare = decodedToken.userShare;
                    } catch {} // Ignore errors for second secret
                }
            } catch {} // Ignore any other errors (like malformed auth header)
        }

        return projectService.getAllProjects(userShare);
    }

    @Get('{id}')
    public async getProjectById(@Path() id: number): Promise<ProjectRespDTO | null> {
        return projectService.getProjectById(id);
    }

    @Get('/Entity')
    public async getProjectsByEntityId(@Query() entityIds: string): Promise<ProjectRespDTO[] | null> {
        const ids = entityIds.split(',').map(Number);
        return projectService.getProjectsByEntityIds(ids);
    }    

    @Post('/')
    public async createProject(@Body() project: ProjectReqDTO): Promise<ProjectRespDTO | null> {
        return projectService.createProject(project);
    }

    @Put('{id}')
    public async updateProject(
        @Path() id: number,
        @Body() updateData: {
            address?: string,
            description?: string,
            overallCost?: number,
            maturityLockingPeriod?: number,
            ownerName?: string,
            settings?: { [key: string]: any }
            file?:string;
        }
    ): Promise<ProjectRespDTO | null> {
        const updatedProjectDetails = projectService.updateProject(id, updateData);

        if (updatedProjectDetails) {
            return updatedProjectDetails;
        } else {
            throw new Error('Role not found or update failed');
        }
    }
}