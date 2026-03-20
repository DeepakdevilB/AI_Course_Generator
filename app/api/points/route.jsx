import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ points: 0 });
        }

        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
            return NextResponse.json({ points: 0 });
        }

        const userInDb = await db.select().from(usersTable).where(eq(usersTable.email, email));

        if (userInDb.length > 0) {
            return NextResponse.json({ points: userInDb[0].points || 0 });
        } else {
            // User not yet registered in usersTable, so 0 points.
            return NextResponse.json({ points: 0 });
        }
    } catch (error) {
        console.error("Error fetching user points:", error);
        return NextResponse.json({ points: 0 }, { status: 500 });
    }
}
