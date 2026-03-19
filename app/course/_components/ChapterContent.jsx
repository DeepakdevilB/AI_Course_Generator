// File: app/course/_components/ChapterContent.jsx

"use client"

import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Loader2Icon, X, Volume2, VolumeX } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';
import Quiz from './Quiz';
import ChapterNotes from './ChapterNotes';

function ChapterContent({ courseInfo, refreshData }) {
    const { courseId } = useParams();
    const { courses, enrollCourse } = courseInfo ?? '';
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
    let completedChapter = enrollCourse?.completedChapters ?? [];
    
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        };
    }, [selectedChapterIndex]);

    const markChapterCompleted = async () => {
        setLoading(true);
        completedChapter.push(selectedChapterIndex);
        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChapter
        });
        refreshData();
        toast.success('Chapter Marked Completed!');
        setLoading(false);
    }

    const markInCompleteChapter = async () => {
        setLoading(true); 
        const completeChap = completedChapter.filter(item => item != selectedChapterIndex);
        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completeChap
        });
        refreshData();
        toast.success('Chapter Marked Incomplete!');
        setLoading(false);
    }

    const getPlainText = (html) => {
        if (typeof window !== 'undefined') {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
        }
        return "";
    }
    
    const chapterNotesText = topics?.map(topic => getPlainText(topic.content)).join('\n\n');

    // Compile topics into a single HTML string for the translator component
    // Note: We use 'class' here instead of 'className' because it becomes raw HTML
    const originalNotesHtml = topics?.map((topic, index) => `
        <div class="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 class="font-bold text-2xl text-primary mb-4">${index + 1}. ${topic?.topic}</h2>
            <div class="prose prose-slate max-w-none" style="line-height: 2.0; font-size: 1.1rem;">
                ${topic?.content}
            </div>
        </div>
    `).join('') || '';

    const toggleSpeech = () => {
        if (!('speechSynthesis' in window)) {
            toast.error("Text-to-speech is not supported in this browser.");
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const title = courseContent?.[selectedChapterIndex]?.courseData?.chapterName;
            const fullTextToRead = `${title}. \n\n ${chapterNotesText}`;
            
            const utterance = new SpeechSynthesisUtterance(fullTextToRead);
            utterance.rate = 0.9; 
            utterance.onend = () => setIsSpeaking(false);
            
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    }

    return (
        <div className='p-10 ml-80 mt-20'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
                
                <div className='flex gap-3'>
                    <Button variant="secondary" onClick={toggleSpeech} className="font-semibold border-primary/20 border">
                        {isSpeaking ? <VolumeX className='w-5 h-5 mr-2 text-red-500'/> : <Volume2 className='w-5 h-5 mr-2 text-primary'/>}
                        {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
                    </Button>

                    {!completedChapter?.includes(selectedChapterIndex) ?
                        <Button onClick={() => markChapterCompleted()} disabled={loading}> 
                            {loading ? <Loader2Icon className='animate-spin' /> : <CheckCircle />}
                            Mark as Completed 
                        </Button> :
                        <Button variant="outline" onClick={markInCompleteChapter} disabled={loading}>
                            {loading ? <Loader2Icon className='animate-spin' /> : <X />} 
                            Mark incomplete 
                        </Button>
                    }
                </div>
            </div>
            
            <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
            <div className='grid grid-cols-1 gap-5'>
                {videoData?.map((video, index) => index < 1 && (
                    <div key={index}>
                        <YouTube
                            videoId={video?.videoId}
                            opts={{ height: '450px', width: '100%' }}
                        />
                    </div>
                ))}
            </div>

            {/* This replaces the old raw topics.map loop */}
            <ChapterNotes originalNotes={originalNotesHtml} />

            <Quiz notes={chapterNotesText} />
        </div>
    )
}

export default ChapterContent