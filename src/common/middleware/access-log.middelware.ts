// src/common/middleware/access-log.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { url } from 'inspector';
import { v4 as uuid } from 'uuid';

function redact(headers: Record<string, any>) {
  const copy = { ...headers };

  for (const k of ['authorization', 'x-api-key', 'cookie']) {
    if (copy[k]) {
      copy[k] = '***redacted***';
    }
  }

  return copy;
}

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: Function) {
    const start = Date.now();
    const id = uuid();
    req.requestId = id;
    res.setHeader('X-Request-Id', id);  
    const inMsg = {
        requestId: id,
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        ip: req.ip
    };
    console.log('[IN]', JSON.stringify(inMsg));
    res.on('finish', () => { 
        
        const outMsg = {
            requestId: id,
            statusCode: res.statusCode,
            durationMs: Date.now() - start,
            method : req.method,   
            url : req.originalUrl

        };
        console.log('[OUT]', JSON.stringify(outMsg));
    });
    next();
  }
}
