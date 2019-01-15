import { DateTime } from "ionic-angular";

export interface User {
    userID: number,
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    password: string,
    dateOfBirth?: DateTime,
    citizenship?: string,
    notificationPreference: number,
    ssn?: number,
    primaryPhone?: string,
    secondaryPhone?: string,
    isDeleted: boolean,
    risk?: number
}