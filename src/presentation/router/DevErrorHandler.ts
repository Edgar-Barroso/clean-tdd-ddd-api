import { ErrorHandler } from "../core/ErrorHandler";
import { HttpResponse } from "../core/HttpResponse";

export class DevErrorHandler implements ErrorHandler {
    errorMappings: { [key: string]: { statusCode: number} } = {
        InvalidCredentialsError: { statusCode: 401 },
        SessionNotFoundError: { statusCode: 404 },
        UserAlreadyExistsError: { statusCode: 409},
        UserNotFoundError: { statusCode: 404},
        ValidationError: { statusCode: 422},
    };

    execute(error: Error): HttpResponse {
        const errorMapping = this.errorMappings[error.constructor.name] || { statusCode: 500, message: "Internal Server Error" };
        return { statusCode: errorMapping.statusCode, body: { message: error.message } };
    }
}
