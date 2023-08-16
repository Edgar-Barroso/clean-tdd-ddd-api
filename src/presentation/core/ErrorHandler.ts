import { HttpResponse } from "../core/HttpResponse";

export interface ErrorHandler{
    execute(error:Error):HttpResponse
}