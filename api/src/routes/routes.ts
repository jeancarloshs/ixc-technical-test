import express, { Request, Response } from 'express';

const routes = (app: any) => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: "Server is running" });
  })
}

export default routes;