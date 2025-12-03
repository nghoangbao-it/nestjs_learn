import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';
dotenv.config();
class ConfigSchema {
  @IsString()
  DATABASE_URL: string;
  @IsString()
  ACCESS_TOKEN_SECRET: string;
  @IsString()
  ACCESS_TOKEN_EXPIRE_IN: string;
  @IsString()
  REFRESH_TOKEN_SECRET: string;
  @IsString()
  REFRESH_TOKEN_EXPIRE_IN: string;
  @IsString()
  SECRECT_API_KEY: string;
}

const configServer = plainToInstance(ConfigSchema, process.env);
const validatedErrors = validateSync(configServer);

if (validatedErrors.length > 0) {
  console.warn('Error in .env file');
  const customListError = validatedErrors.map((err) => ({
    property: err.property,
    value: err.value,
    constraints: err.constraints,
  }));
  console.log(customListError)
}

const envConfig = configServer;
export default envConfig;
