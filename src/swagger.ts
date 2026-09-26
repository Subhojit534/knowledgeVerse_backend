import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import fs from 'fs';
import path from 'path';

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";

export function setupSwagger(app: Express) {
  const swaggerPath = path.resolve(process.cwd(), 'swagger.json');
  let swaggerSpec = {};
  try {
    const data = fs.readFileSync(swaggerPath, 'utf8');
    swaggerSpec = JSON.parse(data);
  } catch (err) {
    console.error("Could not load swagger.json. Did you run generate-swagger.js?", err);
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  }));
  console.log('📄 Swagger docs available at /api-docs');
}
