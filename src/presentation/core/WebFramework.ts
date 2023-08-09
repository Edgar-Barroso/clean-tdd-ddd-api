import { Controller } from "./Controller"

export interface WebFramework{
  on(url:string,method:string,middlewares:any[],controller:Controller):void
  ws(url: string, method: string,middlewares:any[],fn:any):void
  listen(port: number): void
  verifyToken(req:any,res:any):void
  close():void
}