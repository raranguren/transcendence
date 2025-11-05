import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userService from "../users/user.service.ts";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

const registerSchema = {
  body: {},
  response: {
    201: true,
  },
};

function registerUser(fastify: FastifyInstance) {
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
      res.send();
    }
  );
}

export default registerUser;
