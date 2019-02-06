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

// Interface to represent some of the response data that involves retrieving portfolios
export interface PortfolioData extends ApiData{
    portfolio: Portfolio;
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

// An interface that represents a portfolio
export interface Portfolio {
    portfolio_id: number,
    title: string,
    description?: string,
    created_at: DateTime,
    updated_at: DateTime,
    is_active: number, //todo: change to bit in database
    is_deleted: boolean,
    expected_return: number,
    risk: number
    holdings: Holding[]
}

// An interface that represents a holding
export interface Holding {
    holding_id: number,
    holding_name: string,
    weight: number,
    fees_per_year: number,
    portfolio_id: number
}