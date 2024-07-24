// make sure file name is route.ts

import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
const fs = require('fs');
import path from "path";


export const POST = async (request: Request) => {
    const data = await request.formData();

    let validatedData;
    try {
        validatedData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image'),
        });
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }
    console.log(validatedData)
    const extension = validatedData.image.name.split('.').slice(-1);
    const filename = `${Date.now()}.${extension}`;

    try {
        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        const currentWorkingDirectory = process.cwd();
        await writeFile(path.join(currentWorkingDirectory, 'public/assets', filename), buffer);
    } catch (err) {
        return Response.json({ message: 'Failed to save the file to fs' }, { status: 500 });
    }

    try {
        await db.insert(products).values({ ...validatedData, image: filename });
    } catch (err) {
        // remove stored image from fs
        const currentWorkingDirectory = process.cwd();
        fs.unlink(path.join(currentWorkingDirectory, 'public/assets', filename), (err: any) => {
            if (err) {
              console.error('Error deleting the file:', err);
            } else {
              console.log('File deleted successfully');
            }
          });
        return Response.json(
            { message: 'Failed to store product into the database' },
            { status: 500 }
        );
    }

    return Response.json({ message: 'OK' }, { status: 201 });

}