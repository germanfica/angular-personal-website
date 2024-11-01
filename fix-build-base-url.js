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
    const tempDestinationPath = path.join('dist/personal/temp/browser', APP_BASE_PATH);

    if (fs.existsSync(sourcePath)) {
        fs.renameSync(sourcePath, tempDestinationPath);
        console.log(`Carpeta movida de ${sourcePath} a ${tempDestinationPath}`);
    } else {
        console.error(`La carpeta de origen ${sourcePath} no existe`);
    }

    // Crear el directorio final si no existe
    const finalDestinationBasePath = 'dist/personal/browser';
    createDirectory(finalDestinationBasePath);

    // Mover la carpeta temporal completa de regreso a dist/personal/browser/${APP_BASE_PATH}
    const finalDestinationPath = path.join(finalDestinationBasePath, APP_BASE_PATH);

    if (fs.existsSync(tempDestinationPath)) {
        fs.renameSync(tempDestinationPath, finalDestinationPath);
        console.log(`Carpeta movida de ${tempDestinationPath} a ${finalDestinationPath}`);
    } else {
        console.error(`La carpeta temporal ${tempDestinationPath} no existe`);
    }

    // Eliminar la carpeta dist/personal/temp
    const tempPath = 'dist/personal/temp';
    if (fs.existsSync(tempPath)) {
        fs.rmSync(tempPath, { recursive: true });
        console.log(`Carpeta temporal eliminada: ${tempPath}`);
    }
} else {
    console.log('APP_BASE_PATH no tiene un valor asignado');
}
