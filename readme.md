# Boilerplate Documentation

## Before you Start
1. Install all dependencies
```bash
npm install
```
2. Running Development server
```bash
npm run dev
```

## Using Prisma instead of sequelize.
1. Introspect/pull DB to make schema (_using custom script_)
```bash
npm run prismaDbPull
```
2. Check or validate the schema for any error (_using custom script_)
```bash
npm run prismaValidate
```
3. Generate prisma client (_using custom script_)
```bash
npm run prismaGenerate
```
4. import prisma from client when using it in your working file.
```js
import prisma from '@/prisma/client';
```

5. Update table schema if needed.
  Untuk table yang digunakan, silahkan update `update_at` dengan data type schema yang tepat mengikuti anjuran prisma. Hal ini akan membuat prisma mengupdate kolom tanggal tersebut setiap ada perubahan.

## Notes
- **BigInt** akan di convert ke type string. Untuk mematikan fitur bisa melakukan comment di `server.ts` line 11-13.