// Error codes to use by repositories, services and controllers
//
// Usage examples:
//     throw Error(Errors.NOT_FOUND); // in a db repository
//     response.error = Errors.NOT_FOUND; // in a controller
//
// Note: why not use enum?
// Because you get this error: TypeScript enum is not supported in strip-only mode
const Errors = {
  DB_ERROR: "DB_ERROR",
  NOT_FOUND: "NOT_FOUND",

  USERNAME_IN_USE: "USERNAME_IN_USE",
  USERNAME_INVALID: "USERNAME_INVALID",

  PASSWORD_INVALID: "PASSWORD_INVALID",

  EMAIL_IN_USE: "EMAIL_IN_USE",
  EMAIL_INVALID: "EMAIL_INVALID",
  UNAUTHORIZED: "UNAUTHORIZED",
};

// Status code for each error
// This should only be used by a fastify error handler and not manually set by controllers
function getErrorsStatusCode(error: string): number {
  switch (error) {
    case Errors.USERNAME_INVALID:
    case Errors.EMAIL_INVALID:
    case Errors.PASSWORD_INVALID:
      return 400;
    case Errors.USERNAME_IN_USE:
    case Errors.EMAIL_IN_USE:
      return 409;
    case Errors.NOT_FOUND:
      return 404;
	  
	case Errors.UNAUTHORIZED:
		  return 401;
	case Errors.DB_ERROR:
    default:
      return 500;
  }
}

export { Errors, getErrorsStatusCode };
