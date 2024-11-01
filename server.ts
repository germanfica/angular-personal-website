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
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  const basePath = process.env['APP_BASE_PATH'] || '/';

  console.log(`serverDistFolder: ${serverDistFolder}`);
  console.log(`browserDistFolder: ${browserDistFolder}`);

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  const routePath = basePath === '/' ? '*.*' : `${basePath}/**`;
  console.log(`routePath static: ${routePath}`);

  
  server.get('/a/**', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // const allRoutePath = basePath === '/' ? '*' : `${basePath}*`;
  // // All regular routes use the Angular engine
  // server.get(allRoutePath, (req, res, next) => {
  //   const { protocol, originalUrl, baseUrl, headers } = req;
  //   const routePath = basePath === '/' ? baseUrl : basePath;

  //   console.log(`allRoutePath: ${allRoutePath}`)

  //   commonEngine
  //     .render({
  //       bootstrap: AppServerModule,
  //       documentFilePath: indexHtml,
  //       url: `${protocol}://${headers.host}${originalUrl}`,
  //       publicPath: browserDistFolder,
  //       providers: [{ provide: APP_BASE_HREF, useValue: routePath }, { provide: RESPONSE, useValue: res }],
  //     })
  //     .then((html) => res.send(html))
  //     .catch((err) => next(err));
  // });

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