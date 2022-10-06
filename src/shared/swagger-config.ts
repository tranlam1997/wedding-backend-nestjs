import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import config from 'config';

export async function initializeSwagger(app: INestApplication) {
  const serviceName = config.get<string>('service.name');
  const serviceDescription = config.get<string>('service.description');
  const apiVersion = config.get<string>('service.apiVersion');
  const server = app.getHttpAdapter();

  const options = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription(`${serviceDescription} | [swagger.json](swagger.json)`)
    .setVersion(apiVersion)
    .addServer(`${config.get('swagger.schema')}://${config.get('server.hostname')}`)
    .addBearerAuth({ type: 'apiKey', name: 'access-token', in: 'header' })
    .build();

  const oas3Specs = SwaggerModule.createDocument(app, options);
  writeSwaggerJson(`${process.cwd()}`, oas3Specs);

  server.get(`${config.get('swagger.path')}/swagger.json`, (req, res) => {
    res.json(oas3Specs);
  });
  SwaggerModule.setup(config.get('swagger.path'), app, oas3Specs, {
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

