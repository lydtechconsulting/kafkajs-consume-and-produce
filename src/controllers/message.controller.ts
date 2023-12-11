import { Request, Response } from "express";

const sampleMessages = [
  {
    id: 1,
    text: "hello from msg 1",
  },
  {
    id: 2,
    text: "hello from msg 2",
  },
];

export class MessageController {
  getAll(_request: Request, response: Response) {
    response.status(200).send(sampleMessages);
  }

  getById(request: Request, response: Response) {
    const id = Number(request.params.id);

    const message = sampleMessages.find((msg) => msg.id === id);

    response.status(200).send(message);
  }

  create(_request: Request, response: Response) {
    response.status(501).send("Not yet implemented");
  }

  delete(_request: Request, response: Response) {
    response.status(501).send("Not yet implemented");
  }
}
