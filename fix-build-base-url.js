const fs = require('fs');
const path = require('path');

// Variable que contiene el valor de APP_BASE_PATH
const APP_BASE_PATH = process.env.APP_BASE_PATH;

// Ruta del archivo de estado
const migrationStatusFile = 'dist/personal/.migration_applied';

// Función para realizar la sustitución de APP_BASE_PATH en un archivo
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

// Verificar si la migración ya fue aplicada
if (fs.existsSync(migrationStatusFile)) {
    console.log('Migration has already been applied.');
} else if (APP_BASE_PATH) {
    console.log(`APP_BASE_PATH has the value: ${APP_BASE_PATH}`);

    // Realizar la sustitución de la variable en archivos HTML
    //substituteEnvVariable('dist/personal/server', 'index.server.html');
    //substituteEnvVariable('dist/personal/browser', 'index.html');
    // Realizar la sustitución de la variable en todos los archivos index.html de los directorios especificados
    substituteEnvVariableInDirectory('dist/personal/server', 'index.server.html');
    substituteEnvVariableInDirectory('dist/personal/browser', 'index.html');

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
