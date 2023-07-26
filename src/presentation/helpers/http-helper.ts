import { HttpResponse } from "../core/HttpResponse";



export const ok = (body: any,props:any): HttpResponse => {
    return {
        statusCode: 200,
        body,
        ...props
    };
}
export const badRequest = (body?:any):HttpResponse => {
    return {
        statusCode:400,
        body: body ?? { error: "Bad request" }
    }
}

export const created = (body?: any): HttpResponse => {
    return {
        statusCode: 201,
        body
    };
}
export const noContent = (): HttpResponse => {
    return {
        statusCode: 204,
        body: null
    };
}
export const unauthorized = (): HttpResponse => {
    return {
        statusCode: 401,
        body: { error: "Unauthorized" }
    };
}
export const forbidden = (): HttpResponse => {
    return {
        statusCode: 403,
        body: { error: "Forbidden" }
    };
}
export const notFound = (): HttpResponse => {
    return {
        statusCode: 404,
        body: { error: "Not found" }
    };
}
export const internalServerError = (): HttpResponse => {
    return {
        statusCode: 500,
        body: { error: "Internal server error" }
    };
}
export const conflict = (body: any): HttpResponse => {
    return {
        statusCode: 409,
        body
    };
}
