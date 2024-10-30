import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import { RESPONSE } from './src/express.token';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, `../browser`);
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const basePath = process.env['APP_BASE_PATH'] || '/';

  // Imprimir las rutas configuradas
  console.log('Ruta de serverDistFolder:', serverDistFolder);
  console.log('Ruta de browserDistFolder:', browserDistFolder);

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from browserDistFolder with base path
  server.use(`${basePath}`, express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Use Angular engine for routes starting with the base path
  server.get(`${basePath}*`, (req, res, next) => {
    const { protocol, originalUrl, headers } = req;

    console.log(`${protocol}://${headers.host}${originalUrl}`);

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: basePath },
          { provide: RESPONSE, useValue: res }
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  // Handle any other route not starting with the base path
  server.get('*', (req, res) => {
    res.status(404).send('Not found');
  });

  return server;
}

function run(): void {
  const port = process.env['SSR_PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
