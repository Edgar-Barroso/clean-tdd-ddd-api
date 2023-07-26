export interface HttpResponse {
  statusCode: number;
  body?: any;
  token?: { 
    header: any;
    payload: { 
      sign: { 
        expiresIn: string 
        sub:string;
      } } 
      
    };
}
