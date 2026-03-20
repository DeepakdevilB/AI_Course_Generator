import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress';
import { Book, PlayCircle, Trophy, BarChart, Rocket } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function EnrollCourseCard({ course, enrollCourse }) {
    const courseJson = course?.courseJson?.course;

    const CalculatePerProgress = () => {
        const totalChapters = course?.courseContent?.length;
        if (!totalChapters) {
            return 0; // Avoid division by zero
        }
        const completedChapters = enrollCourse?.completedChapters?.length || 0;
        return (completedChapters / totalChapters) * 100;
    }

    const progress = CalculatePerProgress();
    
    return (
        <div className='group relative flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full'>
            
            {/* Minimal Image Header Container */}
            <div className='relative w-full aspect-[21/9] overflow-hidden bg-gradient-to-r from-gray-900 to-indigo-900'>
                {course?.bannerImageUrl ? (
                    <Image 
                        src={course?.bannerImageUrl} 
                        alt={courseJson?.name || "Course Image"}
                        fill
                        className='object-cover opacity-70 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90 mix-blend-overlay'
                    />
                ) : (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 opacity-90 mix-blend-overlay'>
                        <Book className='h-8 w-8 text-white/50 mb-2 transition-transform duration-700 group-hover:scale-110 group-hover:text-white/80' />
                        <span className="text-white/90 font-bold px-4 text-center text-sm leading-tight transition-colors line-clamp-1">
                            {courseJson?.name || "Course Overview"}
                        </span>
                    </div>
                )}
                
                <div className={`absolute top-0 right-0 h-full w-2 bg-gradient-to-b ${progress === 100 ? 'from-emerald-400 to-emerald-600' : progress > 0 ? 'from-indigo-400 to-indigo-600' : 'from-gray-300 to-gray-400'}`}></div>
            </div>

            {/* Content Area */}
            <div className='p-6 flex flex-col flex-grow gap-5'>
                <div>
                    <h2 className='font-bold text-xl text-gray-900 leading-tight mb-2 group-hover:text-indigo-700 transition-colors'>
                        {courseJson?.name || 'Untitled Course'}
                    </h2>
                    <p className='line-clamp-2 text-gray-500 text-sm leading-relaxed'>
                        {courseJson?.description || 'No description available.'}
                    </p>
                </div>
                
                {/* Progress Section */}
                <div className='mt-auto pt-4 border-t border-gray-50'>
                    <div className='flex justify-between items-center mb-2'>
                        <div className="flex items-center text-sm font-semibold text-gray-700">
                            {progress === 100 ? (
                                <><Trophy className="w-4 h-4 text-emerald-500 mr-1.5" /> Completed</>
                            ) : progress > 0 ? (
                                <><Rocket className="w-4 h-4 text-indigo-500 mr-1.5" /> In Progress</>
                            ) : (
                                <><BarChart className="w-4 h-4 text-gray-400 mr-1.5" /> Not Started</>
                            )}
                        </div>
                        <span className={`text-sm font-bold ${progress === 100 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                            {progress.toFixed(0)}%
                        </span>
                    </div>
                    
                    <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                        <div 
                            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-fuchsia-500'}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    
                    <Link href={'/workspace/view-course/' + course?.cid} className="block w-full">
                        <Button className={`w-full h-11 rounded-xl shadow-md transition-all ${progress === 100 ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:-translate-y-0.5'}`}> 
                            <PlayCircle className={`h-5 w-5 mr-2 ${progress === 100 ? 'text-gray-500' : ''}`} /> 
                            {progress === 100 ? 'Review Course' : progress > 0 ? 'Continue Learning' : 'Start Learning'} 
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EnrollCourseCard