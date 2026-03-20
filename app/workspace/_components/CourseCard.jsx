import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings, Star, Clock } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseCard({ course, refreshData }) {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        try {
            setLoading(true);
            const result = await axios.post('/api/enroll-course', {
                courseId: course?.cid
            });
            console.log(result.data);
            if (result.data.resp) {
                toast.warning('Already Enrolled!');
                setLoading(false);
                return;
            }
            toast.success('Enrolled!')
            setLoading(false);
            refreshData()
        }
        catch (e) {
            toast.error('Server side error')
            setLoading(false);
        }
    }

    return (
        <div className='group relative flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full'>
            
            {/* Image Container */}
            <div className='relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50'>
                {course?.bannerImageUrl ? (
                    <Image 
                        src={course?.bannerImageUrl} 
                        alt={courseJson?.name || "Course Image"}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                ) : (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500'>
                        <Book className='h-12 w-12 text-white/50 mb-3 transition-transform duration-700 group-hover:scale-110 group-hover:text-white/80' />
                        <span className="text-white/90 font-bold px-4 text-center text-sm leading-tight transition-colors line-clamp-2">
                            {courseJson?.name || "Course Overview"}
                        </span>
                    </div>
                )}
                
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {courseJson?.category || "AI Generated"}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className='p-6 flex flex-col flex-grow gap-4'>
                <div className="flex-grow">
                    <h2 className='font-bold text-xl text-gray-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors'>
                        {courseJson?.name || 'Untitled Course'}
                    </h2>
                    <p className='line-clamp-2 text-gray-500 text-sm leading-relaxed'>
                        {courseJson?.description || 'No description available for this course.'}
                    </p>
                </div>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 py-3 border-y border-gray-50">
                    <div className='flex items-center text-xs font-semibold text-gray-600'>
                        <Book className='text-indigo-500 h-4 w-4 mr-1.5' /> 
                        {courseJson?.noOfChapters || 0} Modules
                    </div>
                    <div className='flex items-center text-xs font-semibold text-gray-600'>
                        <Star className='text-amber-400 h-4 w-4 mr-1.5' /> 
                        4.9
                    </div>
                    <div className='flex items-center text-xs font-semibold text-gray-600'>
                        <Clock className='text-emerald-500 h-4 w-4 mr-1.5' /> 
                        Self-paced
                    </div>
                </div>

                {/* Actions */}
                <div className='pt-2 mt-auto w-full'>
                    {course?.courseContent?.length ? (
                        <Button 
                            className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-md transition-all group-hover:bg-indigo-600"
                            onClick={onEnrollCourse}
                            disabled={loading}
                        > 
                            {loading ? <LoaderCircle className='animate-spin h-5 w-5 mr-2' /> : <PlayCircle className='h-5 w-5 mr-2' />}  
                            Enroll Course 
                        </Button>
                    ) : (
                        <Link href={'/workspace/edit-course/' + course?.cid} className="block w-full"> 
                            <Button 
                                variant='outline' 
                                className="w-full h-11 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all font-semibold"
                            > 
                                <Settings className="h-4 w-4 mr-2" /> 
                                Generate Course
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            
        </div>
    )
}

export default CourseCard