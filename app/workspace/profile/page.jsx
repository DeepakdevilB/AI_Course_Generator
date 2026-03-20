'use client';

import { UserProfile } from '@clerk/nextjs';
import React from 'react';
import { UserCircle } from 'lucide-react';

function Profile() {
    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2.5 rounded-xl">
                        <UserCircle className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className='font-extrabold text-3xl tracking-tight text-gray-900'>Your Profile</h2>
                        <p className="text-gray-500 font-medium">Manage your personal information and preferences</p>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/40 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
                <div className="relative z-10 w-full flex justify-center [&_.cl-rootBox]:w-full [&_.cl-card]:w-full [&_.cl-card]:max-w-3xl [&_.cl-card]:shadow-none [&_.cl-navbar]:max-w-[250px]">
                    <UserProfile routing="hash" />
                </div>
            </div>
        </div>
    );
}

export default Profile;
