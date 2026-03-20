import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { coursesTable, enrollCourseTable } from '../config/schema';
import * as dotenv from 'dotenv';
dotenv.config();

const pg = neon(process.env.DATABASE_URL);
const db = drizzle({ client: pg });

const main = async () => {
  try {
    console.log("Fetching courses with empty thumbnails...");
    // Find courses with no banner (older courses)
    const oldCourses = await db.select().from(coursesTable).where(eq(coursesTable.bannerImageUrl, ''));
    
    if (oldCourses.length === 0) {
      console.log("No older courses found.");
      return;
    }

    console.log(`Found ${oldCourses.length} older courses.`);

    for (const course of oldCourses) {
      console.log(`Deleting course: ${course.name} (${course.cid})`);
      
      // Delete from enrollments first (Foreign Key constraint)
      await db.delete(enrollCourseTable).where(eq(enrollCourseTable.cid, course.cid));
      
      // Delete from courses
      await db.delete(coursesTable).where(eq(coursesTable.cid, course.cid));
    }
    
    console.log("Successfully deleted all older courses!");
  } catch (error) {
    console.error("Error deleting courses: ", error);
  }
};

main();
