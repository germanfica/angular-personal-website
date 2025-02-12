const fs = require('fs');

// Variables requeridas
const requiredEnvVars = [
    'API_PROD_BASE_URL',
    'API_CONTACT',
    'API_RECAPTCHA_SITE_KEY'
];

// Comprobar si todas las variables de entorno están definidas
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
    console.error("❌ ERROR: Faltan las siguientes variables de entorno:");
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error("💡 Asegúrate de definirlas antes de ejecutar el build.");
    process.exit(1); // Detiene la ejecución con error
}

// Configuración para desarrollo (no prod)
const devEnvFileContent = `
export const api = {
    production: false,
    baseUrl: '${process.env.API_DEV_BASE_URL || process.env.API_PROD_BASE_URL}',
    contact: '${process.env.API_CONTACT}',
    recaptcha: {
        siteKey: '${process.env.API_RECAPTCHA_SITE_KEY}',
    }
};
`;

// Configuración para producción
const prodEnvFileContent = `
export const api = {
    production: true,
    baseUrl: '${process.env.API_PROD_BASE_URL}',
    contact: '${process.env.API_CONTACT}',
    recaptcha: {
        siteKey: '${process.env.API_RECAPTCHA_SITE_KEY}',
    }
};
`;

// Guardar los archivos en `src/environments/`
fs.writeFileSync('src/environments/environment.api.ts', devEnvFileContent);
fs.writeFileSync('src/environments/environment.api.prod.ts', prodEnvFileContent);

console.log("✅ Archivos de configuración generados exitosamente:");
console.log("   - environment.api.ts (desarrollo)");
console.log("   - environment.api.prod.ts (producción)");
