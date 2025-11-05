import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userService from "../users/user.service.ts";
import { Errors } from "../../errors.ts";

interface LoginBody {
  username: string;
  password: string;
}

const loginSchema = {
  body: {},
  response: {
    201: true,
  },
};

function loginRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    { schema: loginSchema },
    (req: FastifyRequest<{ Body: LoginBody }>, res: FastifyReply) => {
      const user = userService.findUser(req.body.username);
      if (!user) {
        throw Error(Errors.UNAUTHORIZED);
      }
      if (!userService.isGoodPassword(user, req.body.password)) {
        throw Error(Errors.UNAUTHORIZED);
      }
      res.send({ token: "xxxxx" });
    }
  );
}

export default loginRoutes;
