//TODO: crear un sistema de logs y guardarlo en un archivo a la misma altura que .migration_applied
// que registre todo el proceso con horario de qué fue lo que se estuvo haciendo
// cada cosa, y al final del log hay que saber si fue un éxito o no

const fs = require('fs');
const path = require('path');

const APP_BASE_PATH = process.env.APP_BASE_PATH;
const APP_OUTPUT_PATH = process.env.APP_OUTPUT_PATH || 'dist/personal';

// Ruta del archivo de estado
const migrationStatusFile = path.join(APP_OUTPUT_PATH, '.migration_applied');

// Función para realizar la sustitución de APP_BASE_PATH en un archivo
// Example of use:
// substituteEnvVariable('dist/personal/server', 'index.server.html');
// substituteEnvVariable('dist/personal/browser', 'index.html');
const substituteEnvVariable = (dir, fileName) => {
    const filePath = path.join(dir, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const updatedContent = content.replace(/\${APP_BASE_PATH}/g, APP_BASE_PATH);
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Environment variable substituted in ${filePath}`);
    } else {
        console.error(`File not found: ${filePath}`);
    }
};

const substituteEnvVariableInDirectory = (dir, fileName) => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Llamada recursiva para buscar en subdirectorios
                substituteEnvVariableInDirectory(filePath, fileName);
            } else if (stat.isFile() && file === fileName) {
                // Realizar la sustitución en el archivo especificado
                const content = fs.readFileSync(filePath, 'utf-8');
                const updatedContent = content.replace(/\${APP_BASE_PATH}/g, APP_BASE_PATH);
                fs.writeFileSync(filePath, updatedContent);
                console.log(`Environment variable substituted in ${filePath}`);
            }
        });
    } else {
        console.error(`Directory not found: ${dir}`);
    }
};

// Función para mover un directorio mediante copiado y eliminación
const moveDir = (src, dest) => {
    fs.cpSync(src, dest, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });
};

// Verificar si la migración ya fue aplicada
if (fs.existsSync(migrationStatusFile)) {
    console.log('Migration has already been applied.');
} else if (APP_BASE_PATH) {
    console.log(`APP_BASE_PATH has the value: ${APP_BASE_PATH}`);

    substituteEnvVariableInDirectory(path.join(APP_OUTPUT_PATH, 'server'), 'index.server.html');
    substituteEnvVariableInDirectory(path.join(APP_OUTPUT_PATH, 'browser'), 'index.html');

    // Crear carpetas en la estructura temporal
    const createDirectory = (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        }
    };

    createDirectory(path.join(APP_OUTPUT_PATH, 'temp'));
    createDirectory(path.join(APP_OUTPUT_PATH, 'temp/browser'));
    createDirectory(path.join(APP_OUTPUT_PATH, 'temp/server'));

    // Mover la carpeta /browser a la estructura temporal
    const sourcePath = path.join(APP_OUTPUT_PATH, 'browser');
    const tempDestinationPath = path.join(APP_OUTPUT_PATH, 'temp/browser', APP_BASE_PATH);

    if (fs.existsSync(sourcePath)) {
        moveDir(sourcePath, tempDestinationPath);
        console.log(`Folder moved from ${sourcePath} to ${tempDestinationPath}`);
    } else {
        console.error(`The source folder ${sourcePath} does not exist`);
    }

    // Crear el directorio final y mover la carpeta de vuelta
    const finalDestinationBasePath = path.join(APP_OUTPUT_PATH, 'browser');
    createDirectory(finalDestinationBasePath);

    const finalDestinationPath = path.join(finalDestinationBasePath, APP_BASE_PATH);

    if (fs.existsSync(tempDestinationPath)) {
        moveDir(tempDestinationPath, finalDestinationPath);
        console.log(`Folder moved from ${tempDestinationPath} to ${finalDestinationPath}`);
    } else {
        console.error(`The temporary folder ${tempDestinationPath} does not exist`);
    }

    // Eliminar la carpeta temporal
    const tempPath = path.join(APP_OUTPUT_PATH, 'temp');
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
