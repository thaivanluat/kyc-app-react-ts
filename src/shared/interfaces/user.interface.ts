export type Role = {
    OFFICER: 'OFFICER',
    NORMAL_USER: 'NORMAL_USER'
}

export enum AddressType {
    Mailing = "Mailing",
    Work = "Work"
}

export interface Address {
    country: string;
    city: string;
    street: string;
    type: AddressType;
}

export enum ContactType {
    Work = "Work",
    Personal = "Personal"
}

export interface Email {
    email: string;
    type: ContactType;
    proffered: boolean;
}

export interface Phone {
    number: string;
    type: ContactType;
    proffered: boolean;
}

export interface IdentificationDocument {
    id: File;
    driverLicense: File;
}

export interface Employment {
    name: string;
    fromYear: number;
    toYear?: number;
}

export interface UserData {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string; // DD/MM/YYYY format
    age: number; // Calculated
    address: Address[];
    emails: Email[];
    phones: Phone[];
    identificationDocuments: IdentificationDocument[];
    employment: Employment[];
}
