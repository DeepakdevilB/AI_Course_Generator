"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Activity } from 'lucide-react';

function EnrollCourseList() {

    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        GetEnrolledCourse();
    }, [])

    const GetEnrolledCourse = async () => {
        setLoading(true);
        const result = await axios.get('/api/enroll-course');
        console.log(result.data);
        setEnrolledCourseList(result.data);
        setLoading(false);
    }
    return (
        <div className='mt-8 animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
            {enrolledCourseList?.length > 0 &&
                <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-6 h-6 text-emerald-500" />
                    <h2 className='font-extrabold text-2xl tracking-tight text-gray-900'>Continue Learning</h2>
                </div>
            }
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {enrolledCourseList?.length > 0 ? enrolledCourseList?.map((course, index) => (
                    <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />
                )) :
                    loading && [1, 2, 3, 4].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[350px]">
                            <Skeleton className="w-full aspect-[21/9] rounded-2xl mb-4" />
                            <Skeleton className="w-3/4 h-6 mb-2" />
                            <Skeleton className="w-full h-4 mb-1" />
                            <Skeleton className="w-5/6 h-4 mb-4" />
                            <div className="mt-auto">
                                <Skeleton className="w-full h-2 rounded-full mb-4" />
                                <Skeleton className="w-full h-11 rounded-xl" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EnrollCourseList