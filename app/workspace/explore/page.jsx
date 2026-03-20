"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search, Compass } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

function Explore() {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();
    
    useEffect(() => {
        user && GetCourseList();
    }, [user])
    
    const GetCourseList = async () => {
        const result = await axios.get('/api/courses?courseId=0');
        console.log(result.data);
        setCourseList(result.data)
    }
    
    return (
        <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-xl">
                    <Compass className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className='font-extrabold text-3xl tracking-tight text-gray-900'>Explore Courses</h2>
            </div>
            <p className="text-gray-500 font-medium mb-8 ml-2">Discover new AI-generated courses tailored for various topics</p>
            
            <div className='flex flex-col sm:flex-row gap-4 max-w-2xl mb-10'>
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                        placeholder="Search for topics, categories..." 
                        className="pl-10 h-12 rounded-2xl bg-white border-gray-200 shadow-sm focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
                    />
                </div>
                <Button className="h-12 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 whitespace-nowrap"> 
                    <Search className="mr-2 h-4 w-4" /> Search
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {courseList.length > 0 ? courseList?.map((course, index) => (
                    <CourseCard course={course} key={index} refreshData={GetCourseList} />
                )) :
                    [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[380px]">
                            <Skeleton className="w-full aspect-[4/3] rounded-2xl mb-4 bg-gray-100" />
                            <Skeleton className="w-3/4 h-6 mb-2" />
                            <Skeleton className="w-full h-4 mb-2" />
                            <Skeleton className="w-5/6 h-4 mb-6" />
                            <div className="mt-auto">
                                <Skeleton className="w-full h-11 rounded-xl" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Explore