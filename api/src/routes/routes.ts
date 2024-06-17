import express, { Request, Response } from 'express';
import usersRoutes from './users.Routes';
import chatRoutes from './chat.Routes';

const routes = (app: any) => {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: "Server is running" });
  })

  app.use(express.json(),
    usersRoutes,
    chatRoutes
  )
}


export default routes;