# REST API Template

This example shows how to implement a **REST API** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Download example and install dependencies

📥 Download this example:

📦 Install npm dependencies:
```
yarn install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered.  The seed file in [`prisma/seed.js`](./prisma/seed.js) will be executed and your database will be populated with the sample data.


### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Env File
```env
SECRET=5fd1b1074b32239bef68b51ec4ba7f404eff3cd81ab7a5a7280d2db9c14b4152
DATABASE_URL=mysql://root:@localhost/sabazius
TOKEN_DURATION=3h

# ReCaptcha
RECAPTCHA_URL=https://www.google.com/recaptcha/api/siteverify
RECAPTCHA_SECRET=6LcUgnYUAAAAAOTAzcT04egqViuSeB_l8F4RrM3X

# Firebase
FIREBASE_STORAGE_BUCKET=gs://teste-e8c5d.appspot.com

# Logger
LOG_LEVEL=combined
LOG_FILE=logs/app.log #Deixe em branco para não gravar logs em arquivo
LOG_INTERVAL=1m #Intervalo de tempo para gravar logs em arquivo
LOG_SIZE=10M #Tamanho máximo do arquivo de logs
LOG_COMPRESS=gzip #Compactação do arquivo de logs (gzip, bzip2, lz4, xz)
LOG_MAX_FILES=15 #Número máximo de arquivos de logs
LOG_MAX_SIZE=0 #Tamanho máximo dos arquivos de logs
```
