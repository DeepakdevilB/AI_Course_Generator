import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId } = await req.json();
    const user = await currentUser();

    //if Course already enrolled
    const enrollCourses = await db.select().from(enrollCourseTable)
        .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
            eq(enrollCourseTable.cid, courseId)));

    if (enrollCourses?.length == 0) {
        const result = await db.insert(enrollCourseTable)
            .values({
                cid: courseId,
                userEmail: user.primaryEmailAddress?.emailAddress
            }).returning(enrollCourseTable)

        return NextResponse.json(result);
    }

    return NextResponse.json({ 'resp': 'Already Enrolled' })

}


export async function GET(req) {

    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId')

    if (courseId) {
        const result = await db.select().from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
                eq(enrollCourseTable.cid, courseId)))

        return NextResponse.json(result[0])
    }
    else {
        const result = await db.select().from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(enrollCourseTable.id));

        return NextResponse.json(result);
    }

}

export async function PUT(req) {
    const { completedChapter, courseId } = await req.json();
    const user = await currentUser();

    const email = user?.primaryEmailAddress?.emailAddress;

    // Fetch current enrollment and course details to see if this completion is new
    const currentEnrollment = await db.select().from(enrollCourseTable)
        .where(and(eq(enrollCourseTable.cid, courseId), eq(enrollCourseTable.userEmail, email)));
    
    const courseDetails = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId));
    
    // Update the completed chapters
    const result = await db.update(enrollCourseTable).set({
        completedChapters: completedChapter
    }).where(and(eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.userEmail, email)))
        .returning(enrollCourseTable);

    // Reward Logic: If they just reached 100% completion, grant points!
    if (currentEnrollment.length > 0 && courseDetails.length > 0) {
        const prevCompletedCount = currentEnrollment[0].completedChapters?.length || 0;
        const newCompletedCount = completedChapter?.length || 0;
        const totalReq = courseDetails[0].noOfChapter;

        // If they just hit the total requirement and it wasn't already completed
        if (newCompletedCount === totalReq && prevCompletedCount < totalReq) {
            console.log("Course Complete! Granting 100 points to user:", email);
            
            // Give 100 points using direct SQL injection or updating via Drizzle if usersTable was fully linked.
            // But we need to make sure the user exists in `usersTable` first
            // Since Clerk handles Auth, the user might not be inside `usersTable` if they just signed up 
            // and no sync webhook exists. But coursesTable references usersTable.
            const { usersTable } = await import('@/config/schema');
            const userInDb = await db.select().from(usersTable).where(eq(usersTable.email, email));
            
            if(userInDb.length > 0) {
                const currentPoints = userInDb[0].points || 0;
                await db.update(usersTable)
                  .set({ points: currentPoints + 100 })
                  .where(eq(usersTable.email, email));
            } else {
                // Insert User on the fly if missing (rare case but safe)
                await db.insert(usersTable).values({
                    name: user?.fullName || 'User',
                    email: email,
                    points: 100
                });
            }
        }
    }

    return NextResponse.json(result);
}