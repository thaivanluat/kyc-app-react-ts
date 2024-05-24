export enum Role {
    OFFICER = 'officier',
    NORMAL_USER = 'normal'
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
    type: string;
    proffered: boolean;
}

export interface Phone {
    number: string;
    type: ContactType;
    proffered: boolean;
}

export interface IdentificationDocument {
    id: File;
    driver_license: File;
}

export interface Employment {
    name: string;
    from_year: number|string;
    to_year?: number|string;
}

export interface ContractInformation {
    emails: Email[],
    phones: Phone[]
}

export interface User {
    email: string,
    password: string,
    id: number,
    role: Role,
    first_name: string;
    middle_name?: string;
    last_name: string;
    date_of_birth: string; // DD/MM/YYYY format
    age?: number; // Calculated
    address: Address[];
    contact_information: ContractInformation,
    id_document: IdentificationDocument;
    employment_information: Employment[];
}
