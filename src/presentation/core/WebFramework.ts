import { Controller } from "./Controller"

export interface WebFramework{
  on(url:string,method:string,middlewares:any[],controller:Controller,):void
  listen(port: number): void
  verifyToken(req:any,res:any):void
  close():void
}