import bcrypt from "bcrypt";
import type { User } from "../../database/dac.ts";
import { Errors } from "../../errors.ts";
import userRepository from "./user.repository.ts";

function isValidEmail(email: string) {
  if (!email || email == "") return false;
  // TODO validate email properly or activate Ajv just for this?
  //   return validator.isEmail(email);
  // or
  //  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.includes("@") && email.includes(".");
}

function isValidUsername(username: string) {
  if (!username || username == "") return false;
  // TODO validate username, starts with letter, no spaces, etc.
  // if (!username || username.length < 3 || username.length > 30) return false;
  // const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  // return regex.test(username);
  return !username.includes(" ");
}

function isSecurePassword(password: string) {
  if (!password || password == "") return false;
  // TODO validate strong password
  return password.length >= 6;
}

function createUser(username: string, email: string, password: string) {
  if (!isValidUsername(username)) {
    throw Error(Errors.USERNAME_INVALID);
  }
  if (!isValidEmail(email)) {
    throw Error(Errors.EMAIL_INVALID);
  }
  if (!isSecurePassword(password)) {
    throw Error(Errors.PASSWORD_INVALID);
  }
  password = bcrypt.hashSync(password, 12);
  return userRepository.add({
    username,
    email,
    password,
    victory: 0,
    defeat: 0,
  });
}

function findUser(userOrEmail: string) {
  if (userOrEmail.includes("@")) return userRepository.getByEmail(userOrEmail);
  return userRepository.getByUsername(userOrEmail);
}

function isGoodPassword(user: User, plainTextPassword: string) {
  return bcrypt.compareSync(plainTextPassword, user.password);
}

// TODO functions to update profile

// TODO functions for GDPR

export default { createUser, findUser, isGoodPassword };
