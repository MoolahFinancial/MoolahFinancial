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
    is_deactivated: boolean,
    risk?: number
}

// An interface that represents a portfolio
export interface Portfolio {
    portfolio_id: number,
    title: string,
    description?: string,
    created_at: DateTime,
    updated_at: DateTime,
    is_active: boolean,
    is_deactivated: boolean,
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

// An interface that represents a question
export interface Question {
    question_id: number,
    question_text: string,
    question_type: string, // What type of question it is (free form, multiple choice, etc)
    json_possible_answers: JSON //JSON that contains all of the possible answers to a question
}

// An interface that represents a UserTag (links a user and a tag together)
export interface UserTag {
    question_id: number,
    user_id: number,
    tag_id: number,
    question_answer: string // Stores a user's answer to a question here
}

// An interface that represents a Tag
export interface Tag {
    tag_id: number,
    tag_name: string
}
