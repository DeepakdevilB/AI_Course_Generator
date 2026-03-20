"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';
import { Sparkles, ArrowRight } from 'lucide-react';

function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        user && GetCourseList();
    }, [user])
    const GetCourseList = async () => {
        const result = await axios.get('/api/courses');
        console.log(result.data);
        setCourseList(result.data)
    }
    return (
        <div className='mt-12 animate-fade-in-up' style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className='font-extrabold text-3xl tracking-tight text-gray-900 flex items-center gap-2'>
                        Your Courses
                    </h2>
                    <p className="text-gray-500 font-medium mt-1">Manage and track your AI-generated learning materials</p>
                </div>
                {courseList?.length > 0 && (
                    <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold h-10 px-4 rounded-xl">
                        View All <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>

            {courseList?.length == 0 ?
                <div className='flex p-12 items-center justify-center flex-col border border-dashed border-gray-300 rounded-3xl mt-2 bg-gray-50/50 relative overflow-hidden group'>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 inline-flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                            <Sparkles className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>Your learning journey begins here</h2>
                        <p className="text-gray-500 mb-8 font-medium">Create your first AI-generated course tailored specifically to your goals and learning style.</p>
                        
                        <AddNewCourseDialog>
                            <Button className="h-12 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1">
                                <span className="font-semibold text-base">Generate First Course</span>
                            </Button>
                        </AddNewCourseDialog>
                    </div>
                </div> :
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {courseList?.map((course, index) => (
                        <CourseCard course={course} key={index} refreshData={GetCourseList} />
                    ))}
                </div>}
        </div>
    )
}

export default CourseList