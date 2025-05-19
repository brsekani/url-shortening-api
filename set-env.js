const fs = require("fs");
const dotenv = require("dotenv");

// Load .env file variables
dotenv.config();

const targetPath = "./src/environments/environment.prod.ts";

const envConfigFile = `
export const environment = {
  production: true,
  tinyUrlApiKey: '${process.env.TINY_URL_API_KEY}',
  apiUrl: '${process.env.API_URL}'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment file generated at ${targetPath}`);
  }
});
