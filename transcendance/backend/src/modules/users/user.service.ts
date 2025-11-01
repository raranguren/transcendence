import bcrypt from "bcrypt";
import { DAC } from "../../database/dac.ts";
import type { User } from "../../database/dac.ts";
import { Errors } from "../../types/errors.enum.ts";

function isValidEmail(email: string): boolean {
  if (email == "") return false;
  // TODO validate email properly or activate Ajv just for this?
  //   return validator.isEmail(email);
  // or
  //  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.includes("@") && email.includes(".");
}

function isValidUsername(username: string): boolean {
  if (username == "") return false;
  // TODO validate username, starts with letter, no spaces, etc.
  // if (!username || username.length < 3 || username.length > 30) return false;
  // const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  // return regex.test(username);
  return !username.includes(" ");
}

// TODO Use a NewUserDto or RegisterDto insted of User for input
function createUser(user: User): User {
  if (!isValidUsername(user.username)) {
    throw Error(Errors.USERNAME_INVALID);
  }
  if (!isValidEmail(user.email)) {
    throw Error(Errors.EMAIL_INVALID);
  }
  user.password = bcrypt.hashSync(user.password, 10);
  return DAC.users.add(user);
}

function findUser(userOrEmail: string): User | null {
  if (userOrEmail.includes("@")) return DAC.users.getByEmail(userOrEmail);
  return DAC.users.getByUsername(userOrEmail);
}

function isGoodPassword(user: User, plainTextPassword: string): boolean {
  return bcrypt.compareSync(plainTextPassword, user.password);
}

// TODO functions to update profile

// TODO functions for GDPR

export default { createUser, findUser, isGoodPassword };
