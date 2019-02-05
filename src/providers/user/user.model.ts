import { DateTime } from "ionic-angular";

// Interface to represent basic json that is returned with multiple moolah APIs
export interface ApiData {
    success: string;
    message: string;
}

// Interface to represent the json data that is retrieved from either the login or register apis
export interface LoginData extends ApiData{
    user: User;
}

// An interface that represents a user
export interface User {
    user_id: number,
    first_name: string,
    middle_name?: string,
    last_name: string,
    email: string,
    password: string,
    date_of_birth?: DateTime,
    citizenship?: string,
    notification_preference: number,
    ssn?: number,
    primary_phone?: string,
    secondary_phone?: string,
    is_deleted: boolean,
    risk?: number
}