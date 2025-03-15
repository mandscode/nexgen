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

export class UserDetailsRespDTO {
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

class UserDetailsService {
    async getUserDetails(id: number): Promise<UserDetailsRespDTO | null> {
        // Fetch user with roles and entities (excluding sensitive fields)
        const user = await User.findByPk(id, {
            include: [
                { model: Role, attributes: ["id", "name"], through: { attributes: [] } },
                { model: Entity, attributes: ["id", "name"], through: { attributes: [] } }
            ],
            attributes: { exclude: ["password", "googleId", "isMasterAdmin"] }
        });

        if (!user) return null;

        // Convert to DTO
        const userDTO = toUserDetailsDTO(user);

        // Check if user is an investor
        const isInvestor = user.roles?.some(role => role.name === "Investor");

        if (isInvestor) {
            const investorDetails = await Investor.findOne({
                where: { userId: id },
                include: [
                    { 
                        model: Account,
                        include: [
                            {
                                model: Transaction,
                                attributes: { exclude: [ "accountId", "modifiedBy"] } // Exclude unwanted fields
                            },
                            {
                                model: Currency
                            }
                        ] 
                    },
                    { model: Project, through: { attributes: [] } }
                ],
                attributes: { exclude: ["userId"] }
            });

            if (investorDetails) {
                userDTO.investor = toInvestorDTO(investorDetails); // Convert to DTO if needed

                userDTO.dashboard = {
                    accounts: [],
                    projectSummary: {
                        projects: []
                    }
                };

                const accountsMap = new Map<number, { id: number; currency: {id:number; name:string;}; totalProjects: number; transactionsTotal: number }>();
                const projectsMap = new Map<number, { projectId: number; projectName: string; totalTransactionAmount: number }>();

                if (investorDetails.accounts) {
                    investorDetails.accounts.forEach(account => {
                        // Initialize account data
                        if (!accountsMap.has(account.id)) {

                            if (!account.currencyDetails) {
                                throw new Error(`Currency details are missing for account ID ${account.id}`);
                            }

                            accountsMap.set(account.id, {
                                id: account.id,
                                currency: { // currency is now an object
                                    id: account.currencyDetails.id,
                                    name: account.currencyDetails.name
                                },
                                totalProjects: investorDetails.projects?.length || 0,
                                transactionsTotal: 0
                            });
                        }
                
                        const accountData = accountsMap.get(account.id)!;
                
                        // Process transactions
                        if (account.transactions) {
                            accountData.transactionsTotal += account.transactions.length;
                
                            account.transactions.forEach(transaction => {
                                if (!projectsMap.has(transaction.projectId)) {
                                    const project = investorDetails.projects?.find(p => p.id === transaction.projectId);
                                    if (project) {
                                        projectsMap.set(transaction.projectId, {
                                            projectId: project.id,
                                            projectName: project.name,
                                            totalTransactionAmount: 0
                                        });
                                    }
                                }

                                // Safely access projectData
                                const projectData = projectsMap.get(transaction.projectId);
                                if (projectData) {
                                    projectData.totalTransactionAmount += transaction.amount;
                                }
                            });
                        }
                    });
                
                    // Convert maps to arrays
                    userDTO.dashboard.accounts = Array.from(accountsMap.values());
                    userDTO.dashboard.projectSummary.projects = Array.from(projectsMap.values());
                }
            }
        }

        return userDTO;
    }
}

const userDetailsService = new UserDetailsService();

export default userDetailsService;