// Error codes to use by repositories, services and controllers
// 
// Usage examples:
//     throw Error(Errors.NOT_FOUND); // in a db repository
//     response.error = Errors.NOT_FOUND; // in a controller
//
export const Errors =
{	
	DB_ERROR: "DB_ERROR",
	NOT_FOUND: "NOT_FOUND",

	USERNAME_IN_USE: "USERNAME_IN_USE",
	USERNAME_INVALID: "USERNAME_INVALID",

	EMAIL_IN_USE: "EMAIL_IN_USE",
	EMAIL_INVALID: "EMAIL_INVALID",
};

// Note: why not use enum?
// Because you get this error:
// backend  | SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode
// Because if we do enum Errors { NOT_FOUND, EMAIL_IN_USE, ... }
// they will show as numbers in json, for example:
//   "error": 1,
// With strings it is serialized:
//   "error": "NOT_FOUND",
