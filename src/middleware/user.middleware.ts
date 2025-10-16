import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request Body:", req.body);

    res.on('finish', () => {
      console.log("Response Status:", res.statusCode);
    });
    console.log('middleware')

    next(); 
  }
}
