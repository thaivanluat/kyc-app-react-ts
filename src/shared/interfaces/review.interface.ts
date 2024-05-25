import { User } from "./user.interface";

export enum IncomeType {
    Salary = "Salary",
    Investment = "Investment",
    Others = "Others"
}

export enum AssetType {
    Bond = "Bond",
    Liquidity = "Liquidity",
    RealEstate = "Real Estate",
    Others = "Others"
}

export enum LiabilityType {
    PersonalLoan = "Personal Loan",
    RealEstateLoan = "Real Estate Loan",
    Others = "Others"
}

export enum SourceOfType {
    Inheritance = "Inheritance",
    Donation = "Donation"
}

export enum Experience {
    LessThan5Years = "< 5 years",
    Between5And10Years = "> 5 and < 10 years",
    MoreThan10Years = "> 10 years"
}

export enum RiskTolerance {
    TenPercent = "10%",
    ThirtyPercent = "30%",
    AllIn = "All-in"
}

export interface FinancialStatus {
    incomes: {
        type: IncomeType;
        amount: number;
    }[];
    assets: {
        type: AssetType;
        amount: number;
    }[];
    liabilities: {
        type: LiabilityType;
        amount: number;
    }[];
    source_of_funds: {
        type: SourceOfType;
        amount: number;
    }[];
    net_worth: number; // Calculated
    experience: Experience;
    risk_tolerance: RiskTolerance;
}

export enum ReviewStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}


export interface Review {
    id: any,
    user: User|undefined,
    financial_status: FinancialStatus,
    date: string; // DD/MM/YYYY format
    status: ReviewStatus
}
