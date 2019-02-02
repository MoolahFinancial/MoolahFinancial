import { DateTime } from "ionic-angular";

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