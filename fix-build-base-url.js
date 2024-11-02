const fs = require('fs');
const path = require('path');

const APP_BASE_PATH = process.env.APP_BASE_PATH;
const APP_OUTPUT_PATH = process.env.APP_OUTPUT_PATH || 'dist/personal';

// Archivos de estado y log
const migrationStatusFile = path.join(APP_OUTPUT_PATH, '.migration_applied');
const logFile = path.join(APP_OUTPUT_PATH, 'migration_log.txt');

// Función para registrar logs
const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
    console.log(message);
};

// Función para realizar la sustitución de APP_BASE_PATH en un archivo
const substituteEnvVariable = (dir, fileName) => {
    const filePath = path.join(dir, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const updatedContent = content.replace(/\${APP_BASE_PATH}/g, APP_BASE_PATH);
        fs.writeFileSync(filePath, updatedContent);
        logMessage(`Environment variable substituted in ${filePath}`);
    } else {
        logMessage(`File not found: ${filePath}`);
    }
};

const substituteEnvVariableInDirectory = (dir, fileName) => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                substituteEnvVariableInDirectory(filePath, fileName);
            } else if (stat.isFile() && file === fileName) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const updatedContent = content.replace(/\${APP_BASE_PATH}/g, APP_BASE_PATH);
                fs.writeFileSync(filePath, updatedContent);
                logMessage(`Environment variable substituted in ${filePath}`);
            }
        });
    } else {
        logMessage(`Directory not found: ${dir}`);
    }
};

// Función para mover un directorio mediante copiado y eliminación
const moveDir = (src, dest) => {
    fs.cpSync(src, dest, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });
};

// Función para crear un directorio si no existe
const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        logMessage(`Directory created: ${dirPath}`);
    }
};

// Función principal de migración
const applyMigration = () => {
    logMessage(`APP_BASE_PATH has the value: ${APP_BASE_PATH}`);

    substituteEnvVariableInDirectory(path.join(APP_OUTPUT_PATH, 'server'), 'index.server.html');
    substituteEnvVariableInDirectory(path.join(APP_OUTPUT_PATH, 'browser'), 'index.html');

    createDirectory(path.join(APP_OUTPUT_PATH, 'temp'));
    createDirectory(path.join(APP_OUTPUT_PATH, 'temp/browser'));
    createDirectory(path.join(APP_OUTPUT_PATH, 'temp/server'));

    const sourcePath = path.join(APP_OUTPUT_PATH, 'browser');
    const tempDestinationPath = path.join(APP_OUTPUT_PATH, 'temp/browser', APP_BASE_PATH);

    if (fs.existsSync(sourcePath)) {
        moveDir(sourcePath, tempDestinationPath);
        logMessage(`Folder moved from ${sourcePath} to ${tempDestinationPath}`);
    } else {
        logMessage(`The source folder ${sourcePath} does not exist`);
    }

    const finalDestinationBasePath = path.join(APP_OUTPUT_PATH, 'browser');
    createDirectory(finalDestinationBasePath);

    const finalDestinationPath = path.join(finalDestinationBasePath, APP_BASE_PATH);

    if (fs.existsSync(tempDestinationPath)) {
        moveDir(tempDestinationPath, finalDestinationPath);
        logMessage(`Folder moved from ${tempDestinationPath} to ${finalDestinationPath}`);
    } else {
        logMessage(`The temporary folder ${tempDestinationPath} does not exist`);
    }

    const tempPath = path.join(APP_OUTPUT_PATH, 'temp');
    if (fs.existsSync(tempPath)) {
        fs.rmSync(tempPath, { recursive: true });
        logMessage(`Temporary folder deleted: ${tempPath}`);
    }

    const migrationInfo = {
        status: "Migration completed successfully",
        timestamp: new Date().toISOString()
    };
    fs.writeFileSync(migrationStatusFile, JSON.stringify(migrationInfo, null, 2));
    logMessage(`Status file created: ${migrationStatusFile}`);
    logMessage("Migration process completed successfully.");
};

const main = () => {
    // Ejecución de la migración si no ha sido aplicada o falta APP_BASE_PATH
    if (fs.existsSync(migrationStatusFile)) {
        logMessage('Migration has already been applied.');
    } else if (APP_BASE_PATH) {
        applyMigration();
    } else {
        logMessage('APP_BASE_PATH is not set');
        logMessage("Migration process failed due to missing APP_BASE_PATH.");
    }
}

main();