import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";


export interface Controller{
    execute(httpRequest:HttpRequest):Promise<HttpResponse>
}