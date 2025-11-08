import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Errors } from "../../utils/errors.utils.ts";
import userService from "../users/user.service.ts";

interface LoginBody {
  username: string;
  password: string;
}

const loginSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      additionalProperties: true, // TODO response schema for swagger
    },
  },
};

function loginRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    { schema: loginSchema },
    async (req: FastifyRequest<{ Body: LoginBody }>, res: FastifyReply) => {
      const user = userService.findUser(req.body.username);
      if (!user) {
        throw Error(Errors.UNAUTHORIZED);
      }
      if (!userService.isGoodPassword(user, req.body.password)) {
        throw Error(Errors.UNAUTHORIZED);
      }
      const payload = user.id;
      const token = fastify.jwt.sign({ payload })
      res.send({ token })
    }
  );
}

export default loginRoutes;
