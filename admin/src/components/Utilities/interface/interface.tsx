export interface EntityInterface {
    id: number;
    name: string;
    address: string;
    country: string;
    regId: string;
    ownerId: number;
    caId: number;
    projects: ProjectDetailInterface[];
}

export interface EntityBasicDetailInterface {
    id: number;
    name: string;
    address: string;
    country: string;
    regId: string;
    ownerId: number;
    caId: number;
}

export interface ProjectSettingsInterface {
    [key: string]: any; // Allow other dynamic properties
}

export interface ProjectDetailInterface {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    startDate: string;
    settings:ProjectSettingsInterface
    actualMaturityDate: string;
    overallCost: number;
    description: string;
    ownerName: string;
    legalId: number;
    maturityLockingPeriod: number;
    resourceGroupId: number;
    legalDocuments: LegalDocument[];
    resources: Resource[];
    investors: Investor[];
}



export interface ProjectBasicDetailInterface {
    id: number;
    name: string;
    address: string;
    startDate: string;
    actualMaturityDate: string;
    overallCost: number;
}

export interface LegalDocument {
    id: number;
    legalId: number;
    resourceId: number;
}

export interface ProjectSettings {
    id: number;
    projectId: number;
    settings: Setting;
}

export interface Setting {
    settingName: string;
    value: string;
}

export interface Resource {
    id: number;
    location: string;
    groupId: number;
    projected: boolean;
}

export interface Investor {
    id?: number;
    userId: string;
    ownerId?: string;
    caId?: string;
    nomineeDetails?: NomineeDetails;
    emergencyContact: EmergencyContact;
    projectIds:any;
}
export interface EmergencyContact {
    name: string;
    mobile: number;
    relation: string;
}

export interface PersonalDetails {
    mobile: string;
    dob: string;
    residentialAddress: string;
    mailingAddress: string;
}


export interface NomineeDetails {
    mobile: number;
    name: string;
    email: any;
    relation: any;
}

export interface Document {
    docName: string;
    docPath: string;
    status:any;
}


export interface Account {
    id: number;
    currency: string;
    interestRate: number;
    investmentType: string;
    investments: Investment[];
    transactionHistory: Transaction[];
}

export interface Investment {
    id: number;
    investedDate: string;
    amount: number;
    modifiedDate: string;
    modifiedBy: number;
}

export interface Transaction {
    id: number;
    investmentId: number;
    userId: number;
    projectId: number;
    credited: boolean;
    amount: number;
    createdDate: string;
}





// Relational Interfaces ==================================================================================

// used under entity
export interface EntityInvestorListInterface {
    id?: any;
    investorId?: number;
    firstName?: string; // Optional field as per provided data
    lastName?: string; // Optional field as per provided data
    emailId: string;
    totalInvestedAmount?:any
}

export interface AllProjectsInterface {
    entityName: any;
    name: any;
    address: string;
    startDate: string;
    actualMaturityDate: string;
    overallCost: number;
    maturityLockingPeriod: number;
}

//  used under project details page basic detail ========================================
export interface ProjectFinancialDetailsInterface {
    startDate: string;
    actualMaturityDate: string;
    maturityLockingPeriod: number;
    overallCost: number;
}

export interface ProjectBasicDetailsInterface {
    entityName: any;
    name: any;
    countryName: string;
    description: string;
    ownerName: string;
}

export interface ProjectLocationDetailsInterface {
    longitude: number;
    latitude: number;
}

export interface ProjectMediaDetailsInterface {
    resources: Resource[];
    resourceGroupId: number;
}

export interface ProjectLegalDetailsInterface {
    legalId: number;
    legalDocuments: LegalDocument[];
}

export interface ProjectInvestorDetailsInterface {
    id: any;
    investorId: number;
    firstName?: string; // Optional field as per provided data
    lastName?: string; // Optional field as per provided data
    emailId: string;
    totalInvest:string;
    investedDate:string;
}


export interface UserInvestedInProjects {
    accountId:number;
    projectId:number;
    accountName:string; //accountName == projectName
    totalInvested: number;
}
    
    
    
    
