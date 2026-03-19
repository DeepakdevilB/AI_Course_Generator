import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// 1. Updated PROMPT with strict JSON instructions and a valid JSON schema representation
const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML. 
Return the response STRICTLY as a valid JSON object. Do not include literal newlines (\\n) or tabs (\\t) inside string values. If you need a newline in the HTML string, escape it properly.
Schema:
{
  "chapterName": "Name of the chapter",
  "topics": [
    {
      "topic": "Name of topic",
      "content": "HTML content here"
    }
  ]
}
User Input:
`

export async function POST(req) {
    const { courseJson, courseTitle, courseId } = await req.json();
    const chapters = courseJson?.chapters || [];
    
    // 🔥 FIX 1: We use an array to collect results instead of Promise.all
    const CourseContent = [];

    // 🔥 FIX 1: We use a for...of loop to process one chapter at a time
    for (const chapter of chapters) {
        const config = {
            responseMimeType: 'application/json', 
        };
        const model = 'gemini-2.5-flash';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });
        
        const RawResp = response.candidates[0].content.parts[0].text;
        
        const RawJson = RawResp.replace(/```json/g, '').replace(/```/g, '').trim();
        
        let JSONResp;
        
        try {
             JSONResp = JSON.parse(RawJson);
        } catch (error) {
             console.error("Failed to parse AI JSON:", RawJson);
             console.error("Parse Error:", error);
             JSONResp = { chapterName: chapter.chapterName, topics: [] }; 
        }

        // GET Youtube Videos
        const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
        console.log({
            youtubeVideo: youtubeData,
            courseData: JSONResp
        })
        
        // Push the completed chapter into our array
        CourseContent.push({
            youtubeVideo: youtubeData,
            courseData: JSONResp
        });

        // 🔥 FIX 1: Add a 3-second delay between Gemini requests to respect the Free Tier limits
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Save to DB
    const dbResp = await db.update(coursesTable).set({
        courseContent: CourseContent
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
        courseName: courseTitle,
        CourseContent: CourseContent
    })
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVideo = async (topic) => {
    const params = {
        part: 'snippet',
        q: topic + ' -shorts', 
        maxResults: 4, 
        type: 'video',
        videoDuration: 'long', 
        videoEmbeddable: 'true', // 🔥 FIX 2: Only fetch videos that allow embedding
        key: process.env.YOUTUBE_API_KEY
    }
    
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList = [];
    
    youtubeVideoListResp.forEach(item => {
        const data = {
            videoId: item.id?.videoId,
            title: item?.snippet?.title
        }
        youtubeVideoList.push(data);
    })
    
    console.log("youtubeVideoList", youtubeVideoList)
    return youtubeVideoList;
}