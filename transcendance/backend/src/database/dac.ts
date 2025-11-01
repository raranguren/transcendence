import { db } from "./init.ts";
import { health } from "./health.ts";
import UserRepository from "./user.repository.ts";


// Data Access Center (DAC)
// It is also a bell distributor.
const DAC = {
  close: () => db.close(),
  health: () => health(),
  bell: () => 1,
  users: UserRepository,
};

export { DAC };
export type { User } from "./user.repository.ts";
