# Nailted Quizz Backend

API para la gestión del quizz para Nailted.

## Descripción

Este proyecto proporciona una API para manejar la gestión del quizz, con funcionalidades relacionadas con preguntas, categorías y recomendaciones globales.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone git@github.com:Arokeji/cidead-nailted-backend.git

2. Instala las dependencias:

- npm install

3. Configura las variables de entorno en un archivo .env en la raíz del proyecto. Asegúrate de incluir las variables necesarias para conectar con la base de datos, JWT_SECRET, y la configuración de nodemailer si se utiliza envío de correos.

## Scripts de npm

A continuación, se detallan los scripts disponibles en el proyecto:

- npm start: Inicia el servidor en modo desarrollo utilizando ts-node-dev, lo que permite la recarga automática del servidor al detectar cambios en los archivos.

- npm run start:pro: Compila el proyecto y lo ejecuta en modo producción. Este script primero ejecuta npm run build para generar los archivos de JavaScript en la carpeta dist y luego ejecuta node ./dist/index.js para iniciar el servidor en producción.

- npm run build: Compila el proyecto TypeScript a JavaScript utilizando tsc (TypeScript Compiler). Los archivos compilados se guardan en la carpeta dist.

- npm run lint: Ejecuta ESLint para verificar la sintaxis y el estilo del código en todo el proyecto, según las reglas configuradas en .eslintrc.

- npm run lint:fix: Ejecuta ESLint en modo de corrección automática. Intenta arreglar los problemas de formato o sintaxis en el código automáticamente.

- npm run test: Ejecuta los tests configurados con Jest utilizando cross-env para establecer una base de datos de prueba (DB_NAME=NAILTED-TEST). Ejecuta las pruebas de forma secuencial (--maxWorkers=1) para evitar problemas de concurrencia.

- npm run test:verbose: Ejecuta los tests de forma detallada, mostrando más información sobre cada test que se ejecuta. Utiliza también la base de datos de prueba.

- npm run seed:question: Ejecuta el archivo question.seed.ts ubicado en src/domain/utils/, que se encarga de inicializar las preguntas en la base de datos.

- npm run seed:category: Ejecuta el archivo category.seed.ts para inicializar las categorías en la base de datos.

- npm run seed:recommendation: Ejecuta el archivo globalRecommendation.seed.ts para inicializar las recomendaciones globales en la base de datos.

- npm run build:swagger-json: Genera el archivo JSON de Swagger para la documentación de la API ejecutando generate-swagger-json.ts en la carpeta src/utils. Usa --ignore-watch para que no observe cambios.

- npm run prepare: Este script ejecuta husky install, lo que configura los ganchos de pre-commit de Husky para automatizar la verificación de código antes de cada commit.

- npm run precommit: Este script se ejecuta automáticamente antes de cada commit (configurado por Husky) y ejecuta tres pasos: npm run lint, npm run test y npm run build para asegurar que el código esté limpio, las pruebas pasen, y que el proyecto pueda compilarse sin errores.