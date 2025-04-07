import Account from '../models/account';
import Transaction from '../models/transaction';
import Entity from "../models/entity";
import Investor from "../models/investor";
import Project from "../models/project";
import Role from "../models/role";
import User from "../models/user";
import { EntityDTO } from "./entity.service";
import { toInvestorDTO } from "./investor.mapper";
import { InvestorRespDTO } from "./investor.service";
import { RoleDTO } from "./role.service";
import { toUserDetailsDTO } from "./UserDetails.mapper";
import Currency from '../models/currency';
import Resource from '../models/resource';

export class UserDetailsDTO {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    status!: string;
    isFirstLogin!: boolean;
    isMasterAdmin!: boolean;
    personalDetails?: Record<string, any>;

    roles?: RoleDTO[];
    entities?: EntityDTO[];

    investor?: InvestorRespDTO;

    dashboard?: {
        accounts: {
            id: number;
            currency: {
                id: number;
                name: string;
            };
            totalProjects: number;
            transactionsTotal: number;
        }[];
        projectSummary: {
            projects: {
                projectId: number;
                projectName: string;
                totalTransactionAmount: number;
            }[];
        };
    };

    // // Portfolio-related data
    portfolio?: {
        totalProjects: number;
        projects: {
            id: number;
            name: string;
            country: string;
            currency: string;
            totalInvested: number;
            transactions: {
                id: number;
                date: string;
                amount: number;
                currency: string;
            }[];
        }[];
    };
}

export class UserDetailsRespDTO {
    id!: number;
    investorId?:number;
    firstName!: string;
    lastName!: string;
    status!: number | string;
    message!: string;
    roles?: RoleDTO[];
    entities?: EntityDTO[];

    InvestedCurrencies?: {
        id: number;
        name: string;
        symbol: string;
    }[];

    Investments?: {
        id: number;
        ProjectId: string;
        currencyId: string;
        status: number;
        maturityLockingPeriod: number;
        investedAmount: string;
        earning: string;
        totalValue: string;
        transactions: {
            id: number;
            title: string;
            date: string;
            credited: boolean;
            amount: string;
        }[];
    }[];

    projects?: {
        id: number;
        name: string;
        address: string;
        country: string;
        latitude: number | null;
        longitude: number | null;
        startDate: string;
        actualMaturityDate: string;
        overallCost: number;
        description: string;
        ownerName: string;
        legalId: string;
        lockInPeriod:any;
        resource:any | null;
    }[];

    Currencies?: {
        id: number;
        name: string;
        symbol: string;
    }[];
}


class UserDetailsService {
    async getUserDetails(id: number, userShare:number): Promise<UserDetailsRespDTO | null> {

        let entityName = userShare == 1 ? 'nexgen' : 'evolve';
        // Fetch user with roles and entities (excluding sensitive fields)
        const user = await User.findByPk(id, {
            include: [
                { model: Role, attributes: ["id", "name"], through: { attributes: [] } },
                { model: Entity, attributes: ["id", "name"], through: { attributes: [] } }
            ],
            attributes: { exclude: ["password", "googleId", "isMasterAdmin", "email", "personalDetails", "picture", "isFirstLogin", "updatedAt"] }
        });

        if (!user) return null;

        
        // Convert to DTO
        const userDTO = toUserDetailsDTO(user);
        
        const { roles, entities, ...filteredUserDTO } = userDTO;
        // Check if user is an investor
        const isInvestor = user.roles?.some(role => role.name === "Investor");
        const isViewer = user.roles?.some(role => role.name === "Viewer");
        
        const entity = entities?.find((e: any) => e.name.toLowerCase() === entityName);
        if (!entity) {
            throw new Error(`You dont have any active investments now, please contact 93232345 to start your investment journey`);
        }
        const entityId = entity.id;

        const projects = await Project.findAll({
            where: { entityID: entityId },
            attributes: ['id'] // Only fetch project IDs for filtering
        });
        
        const projectIds = projects.map((p: any) => p.id);


        let userJSON: UserDetailsRespDTO = {
            ...filteredUserDTO,
            status:filteredUserDTO.status && filteredUserDTO.status == "active" ? 1 : 0,
            message: '',
            InvestedCurrencies: [],
            Investments: [],
            projects: [],
            Currencies: []
        };



        if (isViewer) {
            userJSON.projects = undefined;
            userJSON.Investments = undefined;
            userJSON.InvestedCurrencies = undefined;
            userJSON.Currencies = undefined;
            userJSON.message = "You dont have any active investments now, please contact 93232345 to start your investment journey"
        }
        else if (isInvestor) {
            const investorDetails = await Investor.findOne({
                where: { userId: id },
                include: [
                    {
                        model: Account,
                        include: [
                            {
                                model: Transaction,
                                where: { projectId: projectIds },
                                attributes: { exclude: ["accountId", "modifiedBy"] } // Exclude unwanted fields
                            },
                            {
                                model: Currency
                            }
                        ]
                    },
                    { 
                        model: Project, 
                        where: { entityId },
                        through: { attributes: ['lockInPeriod', 'earning'] },
                        include: [
                            {
                              model: Resource, // Include ProjectResource under Project
                            //   attributes: ['id', 'location'], // Add required attributes
                            }
                        ]
                    }
                ],
                attributes: { include:['id'], exclude: ["userId"] }
            });
            const groupedInvestments = new Map();
            
            investorDetails?.accounts?.forEach((account: any) => {
                account.transactions.forEach((transaction: any) => {
                    const projectId = transaction.projectId;
                    const currencyId = account.currencyDetails.id;
                    
                    const key = `${projectId}-${currencyId}`; // Unique key for investments per project & currency

                    if (!groupedInvestments.has(key)) {
                        const project = investorDetails.projects?.find((p: any) => p.id === projectId);
                        const earning = project?.ProjectInvestor?.earning || 0;
                        const lockInPeriod = project?.ProjectInvestor?.lockInPeriod || '';
                        groupedInvestments.set(key, {
                            id: transaction.id, // First transaction ID, can be adjusted
                            ProjectId: projectId,
                            currencyId: currencyId,
                            lockInPeriod: lockInPeriod ?? null,
                            maturityLockingPeriod: investorDetails.projects?.find(p => p.id === projectId)?.maturityLockingPeriod || 0,
                            investedAmount: (transaction.credited && transaction.details !== 'bonus') ? transaction.amount : 0,
                            earning: earning || 0,
                            totalValue: transaction.credited ? (transaction.amount + earning) : (-transaction.amount + earning),
                            transactions: [] // Will collect transactions below
                        });
                    } else {
                        const existingInvestment = groupedInvestments.get(key);
                        if (transaction.credited && transaction.details !== 'bonus') {
                            existingInvestment.investedAmount = parseFloat(existingInvestment.investedAmount) + transaction.amount;
                        }
                        
                        existingInvestment.totalValue = (parseFloat(existingInvestment.totalValue) + (transaction.credited ? transaction.amount : -transaction.amount));
                    }
                    

                    // Add transaction to the existing project investment
                    groupedInvestments.get(key).transactions.push({
                        id: transaction.id,
                        title: transaction.details, // Assuming `details` contains the transaction title
                        date: transaction.transactionDate,
                        credited: transaction.credited ? true : false,
                        amount: transaction.amount.toFixed(2),
                    });
                });
            });

            // Convert the grouped investments into an array
            const Investments = Array.from(groupedInvestments.values());

            userJSON = {
                ...filteredUserDTO,
                investorId:investorDetails?.id,
                status:filteredUserDTO.status && filteredUserDTO.status == "active" ? 1 : 0,
                "message": 'You dont have any active investments now, please contact 93232345 to start your investment journey',
                Currencies: investorDetails?.accounts?.map((account: any) => ({
                    id: account?.currencyDetails.id || 0,
                    name: account?.currencyDetails.code || '',
                    symbol: account?.currencyDetails.symbol || ''
                })) || [],
                Investments: Investments || [],
                projects: investorDetails?.projects?.map((project: any) => ({
                    id: project.id,
                    name: project.name,
                    address: project.address,
                    country: project.country ?? "Unknown", // Ensure 'country' is always provided
                    latitude: project.latitude ?? null,
                    longitude: project.longitude ?? null,
                    startDate: project.startDate,
                    actualMaturityDate: project.actualMaturityDate,
                    overallCost: project.overallCost,
                    description: project.description,
                    ownerName: project.ownerName,
                    legalId: project.legalId,
                    lockInPeriod: project.ProjectInvestor?.lockInPeriod ?? null,
                    earning: project.ProjectInvestor?.earning ?? null,
                    resource: project.resources ?? null
                })) || []
            }

            if (investorDetails?.accounts?.length == 0) {
                userJSON.InvestedCurrencies = undefined
                userJSON.Currencies = []
            } else if (Investments.length === 0) {
                userJSON.InvestedCurrencies = undefined
                userJSON.Currencies = investorDetails?.accounts?.map((account: any) => ({
                    id: account?.currencyDetails.id || 0,
                    name: account?.currencyDetails.name || '',
                    symbol: account?.currencyDetails.symbol || ''
                })) || []
            }
            // ✅ If no projects, set it as `undefined`
            if (investorDetails && !investorDetails.projects || investorDetails?.projects && investorDetails.projects.length === 0) {
                userJSON.projects = undefined;
            }

            // ✅ If no investments, set it as `undefined`
            if (Investments.length === 0) {
                userJSON.Investments = undefined;
            } else {
                userJSON.Investments = Investments;
            }
        }


        return userJSON;
    }
}

const userDetailsService = new UserDetailsService();

export default userDetailsService;