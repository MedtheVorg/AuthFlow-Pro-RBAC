import { NextFunction, Request, Response } from 'express';

function notFound(req: Request, res: Response, next: NextFunction) {
    return res
        .status(404)
        .json({ errMessage: `Path not found ${req.originalUrl}` });
}

export default notFound;
