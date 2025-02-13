import { Get, Route, Post, Body, Path, Put } from 'tsoa';
import projectService, { ProjectReqDTO, ProjectRespDTO } from '../services/project.service';

@Route('projects')
export class ProjectController {

    @Get('/')
    public async getAllProjects(): Promise<ProjectRespDTO[]> {
        return projectService.getAllProjects();
    }

    @Get('{id}')
    public async getProjectById(@Path() id: number): Promise<ProjectRespDTO | null> {
        return projectService.getProjectById(id);
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