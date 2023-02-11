import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

export async function initializeSwagger(app: INestApplication) {
  const serviceName = process.env.SERVICE_NAME;
  const serviceDescription = process.env.SERVICE_DESCRIPTION;
  const apiVersion = process.env.SERVICE_API_VERSION;
  const server = app.getHttpAdapter();

  const options = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription(`${serviceDescription} | [swagger.json](swagger.json)`)
    .setVersion(apiVersion)
    .addBearerAuth({ type: 'apiKey', name: 'access-token', in: 'header' })
    .build();

  const oas3Specs = SwaggerModule.createDocument(app, options);
  writeSwaggerJson(`${process.cwd()}`, oas3Specs);

  server.get(`${process.env.SWAGGER_DOCS_PATH}/swagger.json`, (req, res) => {
    res.json(oas3Specs);
  });
  SwaggerModule.setup(process.env.SWAGGER_DOCS_PATH, app, oas3Specs, {
    swaggerOptions: {
      displayOperationId: true,
      syntaxHighlight: {
        activated: false,
        theme: 'agate',
      },
    },
  });
}

function writeSwaggerJson(path: string, oas3: Omit<OpenAPIObject, 'paths'>) {
  const swaggerFile = `${path}/swagger.json`;
  fs.writeFileSync(swaggerFile, JSON.stringify(oas3, null, 2), {
    encoding: 'utf8',
  });
}

