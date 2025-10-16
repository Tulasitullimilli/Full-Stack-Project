import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap, timestamp } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('interceptor start here')
        const res = context.switchToHttp().getRequest();
        //console.log('resss',res);
        return next.handle().pipe(
            tap(()=>console.log(' end inteceptor')),
            map((data)=>({
                success:true,
                data,
                timestamp:new Date().toJSON()
            }))
        
    )
    }
}