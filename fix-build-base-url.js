const fs = require('fs');
const path = require('path');

// Variable que contiene el valor de APP_BASE_PATH
const APP_BASE_PATH = process.env.APP_BASE_PATH;

// Ruta del archivo de estado
const migrationStatusFile = 'dist/personal/.migration_applied';

// Verificar si la migración ya fue aplicada
if (fs.existsSync(migrationStatusFile)) {
    console.log('Migration has already been applied.');
} else if (APP_BASE_PATH) {
    console.log(`APP_BASE_PATH has the value: ${APP_BASE_PATH}`);

    // Crear carpetas /dist/personal/temp, /dist/personal/temp/browser y /dist/personal/temp/server si no existen
    const createDirectory = (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        }
    };

    createDirectory('dist/personal/temp');
    createDirectory('dist/personal/temp/browser');
    createDirectory('dist/personal/temp/server');

    // Mover la carpeta /dist/personal/browser a /dist/personal/temp/browser/${APP_BASE_PATH}
    const sourcePath = 'dist/personal/browser';
    const tempDestinationPath = path.join('dist/personal/temp/browser', APP_BASE_PATH);

    if (fs.existsSync(sourcePath)) {
        fs.renameSync(sourcePath, tempDestinationPath);
        console.log(`Folder moved from ${sourcePath} to ${tempDestinationPath}`);
    } else {
        console.error(`The source folder ${sourcePath} does not exist`);
    }

    // Crear el directorio final si no existe
    const finalDestinationBasePath = 'dist/personal/browser';
    createDirectory(finalDestinationBasePath);

    // Mover la carpeta temporal completa de regreso a dist/personal/browser/${APP_BASE_PATH}
    const finalDestinationPath = path.join(finalDestinationBasePath, APP_BASE_PATH);

    if (fs.existsSync(tempDestinationPath)) {
        fs.renameSync(tempDestinationPath, finalDestinationPath);
        console.log(`Folder moved from ${tempDestinationPath} to ${finalDestinationPath}`);
    } else {
        console.error(`The temporary folder ${tempDestinationPath} does not exist`);
    }

    // Eliminar la carpeta dist/personal/temp
    const tempPath = 'dist/personal/temp';
    if (fs.existsSync(tempPath)) {
        fs.rmSync(tempPath, { recursive: true });
        console.log(`Temporary folder deleted: ${tempPath}`);
    }

    // Crear el archivo de estado para indicar que la migración fue aplicada
    const migrationInfo = {
        status: "Migration completed successfully",
        timestamp: new Date().toISOString()
    };
    fs.writeFileSync(migrationStatusFile, JSON.stringify(migrationInfo, null, 2));
    console.log(`Status file created: ${migrationStatusFile}`);
} else {
    console.log('APP_BASE_PATH is not set');
}
