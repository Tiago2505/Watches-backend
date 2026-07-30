import * as env from "env-var";

import "dotenv/config";

export const envs = {

    PORT: env.get('PORT').required().asPortNumber(),
    PUBLIC_PATH: env.get('PUBLIC_PATH').required().asString(),
    CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY: env.get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: env.get('CLOUDINARY_API_SECRET').required().asString(),
    JWT_SEED: env.get('JWT_SEED').required().asString(),
    RESEND_API_KEY: env.get('RESEND_API_KEY').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),

};
