// make sure file name is route.ts

import { db } from '@/lib/db/db';
import { deliveryPersons, warehouses } from '@/lib/db/schema';
import { deliveryPersonSchema } from '@/lib/validators/deliveryPersonSchema';
import { desc, eq } from 'drizzle-orm';

export async function POST(request: Request) {

    const requestData = await request.json();

    let validatedData;

    try {
        validatedData = await deliveryPersonSchema.parse(requestData);
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    try {
        await db.insert(deliveryPersons).values(validatedData);
        return Response.json({ message: 'OK' }, { status: 201 });
    } catch (err) {
        return Response.json(
            { message: 'Failed to store the delivery person into the database' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const allDeliveryPersons = await db
            .select({
                id: deliveryPersons.id,
                name: deliveryPersons.name,
                phone: deliveryPersons.phone,
                warehouse: warehouses.name,
            })
            .from(deliveryPersons) // which table 
            .leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id)) // get warehouse data as well where (deliveryPersons.warehouseId === warehouses.id)
            .orderBy(desc(deliveryPersons.id)); // sorting

        return Response.json(allDeliveryPersons);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch delivery persons' }, { status: 500 });
    }
}