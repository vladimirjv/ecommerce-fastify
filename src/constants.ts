export const PORT = process.env.PORT || 8080;
export const loggerOptions = { prettyPrint: true };
export const logger = process.env["ENVIRONMENT"] === "development" ? loggerOptions : false;
export const accessTokenSecret = process.env["ACCESS_TOKEN_SECRET"] as string;
