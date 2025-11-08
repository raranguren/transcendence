import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userService from "../users/user.service.ts";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

const registerSchema = {
  body: {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      additionalProperties: false, // TODO schema for swagger if not empty
    },
  },
};

function registerRoute(fastify: FastifyInstance) {

  fastify.post(
    "/register",
    { schema: registerSchema },
    (req: FastifyRequest<{ Body: RegisterBody }>, res: FastifyReply) => {
      console.log("body", req.body);
      const user = userService.createUser(
        req.body.username,
        req.body.email,
        req.body.password
      );
      res.code(201).send();
    }
  );

}

export default registerRoute;
