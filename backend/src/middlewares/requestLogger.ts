import { NextFunction, Request, Response } from 'express';
import Logger from '../utils/logger';
export default function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(``);
    Logger.info(
        `Request ==> METHOD : [${req.method}] - URL : [${req.url}] - IP : [${req.ip}]  `
    );

    res.on('finish', () => {
        Logger.info(
            `Response ==> METHOD : [${req.method}] - URL : [${req.url}] - IP : [${req.ip}] - STATUS : [${res.statusCode}]  `
        );
        console.log(``);
    });

    next();
}
