const fs = require('fs');
const path = require('path');

// Variable que contiene el valor de APP_BASE_PATH
const APP_BASE_PATH = process.env.APP_BASE_PATH;

// Verificar si APP_BASE_PATH tiene algún valor
if (APP_BASE_PATH) {
    console.log(`APP_BASE_PATH tiene el valor: ${APP_BASE_PATH}`);

    // Crear carpetas /app/temp, /app/temp/browser y /app/temp/server si no existen
    const createDirectory = (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directorio creado: ${dirPath}`);
        }
    };

    createDirectory('dist/personal/temp');
    createDirectory('dist/personal/temp/browser');
    createDirectory('dist/personal/temp/server');

    // Mover la carpeta /app/browser a /app/temp/browser/${APP_BASE_PATH}
    const sourcePath = 'dist/personal/browser';
    const destinationPath = path.join('dist/personal/temp/browser', APP_BASE_PATH);

    if (fs.existsSync(sourcePath)) {
        fs.renameSync(sourcePath, destinationPath);
        console.log(`Carpeta movida de ${sourcePath} a ${destinationPath}`);
    } else {
        console.error(`La carpeta de origen ${sourcePath} no existe`);
    }

    // Mover /app/temp/browser de regreso a /app/browser
    const finalDestinationPath = '/app/browser';
    if (fs.existsSync(destinationPath)) {
        fs.renameSync(destinationPath, finalDestinationPath);
        console.log(`Carpeta movida de ${destinationPath} a ${finalDestinationPath}`);
    } else {
        console.error(`La carpeta de destino ${destinationPath} no existe`);
    }
} else {
    console.log('APP_BASE_PATH no tiene un valor asignado');
}
