import { Get, Route, Post, Body, Path, Put, Delete, Query } from 'tsoa';
import investorService, { InvestorReqDTO, InvestorRespDTO } from '../services/investor.service';


@Route('investors')
export class InvestorController {

    @Get('/')
    public async getAllInvestors(): Promise<InvestorRespDTO[]> {
        return investorService.getAllInvestors();
    }

    @Get('{id}')
    public async getInvestorById(@Path() id: number): Promise<InvestorRespDTO | null> {
        return investorService.getInvestorById(id);
    }

    @Post('/')
    public async createInvestor(@Body() investor: InvestorReqDTO): Promise<InvestorRespDTO | null> {
        return investorService.createInvestor(investor);
    }

    @Put('/{id}/nomineeDetails')
    public async updateInvestorNomineeDetails(@Path() id: number, @Body() nomitneeDetails: { [id: string]: any }): Promise<InvestorRespDTO | null> {
        return investorService.updateInvestorNomineeDetails(id, nomitneeDetails);
    }

    @Put('/{id}/emergencyContact')
    public async updateEmergencyContact(@Path() id: number, @Body() emergencyContact: { [id: string]: any }): Promise<InvestorRespDTO | null> {
        return investorService.updateInvestorEmergencyContact(id, emergencyContact);
    }

    @Put('/{id}/personalDetails')
    public async updateInvestorPersonalDetails(@Path() id: number, @Body() personalDetails: { [id: string]: any }): Promise<InvestorRespDTO | null> {
        return investorService.updateInvestorPersonalDetails(id, personalDetails);
    }

    @Put('/')
    public async updateInvestor(@Body() investor: InvestorReqDTO): Promise<InvestorRespDTO | null> {
        return investorService.updateInvestor(investor);
    }

    @Put('/{id}/projects/assign')
    public async assignProject(@Path() id: number, @Body() projectIds: number[]): Promise<InvestorRespDTO | null> {
        return investorService.assignProjects(id, projectIds);
    }

    @Put('/{id}/documents')
    public async addDocumentDetails(
        @Path() id: number,
        @Body() docDetails: { id?: string; docName: string; docUrl: string, status: boolean }
    ): Promise<InvestorRespDTO | null> {
        return investorService.addDocumentDetails(id, docDetails);
    }

    @Put('/{id}/documents/{documentId}')
    public async updateDocumentById(
        @Path() id: number,
        @Path() documentId: string,
        @Body() updates: Partial<{ docName: string; docUrl: string; status: boolean }>
    ): Promise<InvestorRespDTO | null> {
        return investorService.updateDocumentById(id, documentId, updates);
    }


    @Get('/{id}/documents')
    public async getDocumentsByInvestorId(@Path() id: number): Promise<{ docName: string; docUrl: string }[]> {
        return investorService.getDocumentsByInvestorId(id);
    }

    @Delete('/{id}/documents/{documentId}')
    public async deleteDocumentById(
        @Path() id: number,
        @Path() documentId: string
    ): Promise<InvestorRespDTO | null> {
        return investorService.deleteDocumentById(id, documentId);
    }

}