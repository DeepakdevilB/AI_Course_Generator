"use client"

import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Coins } from 'lucide-react'

function AppHeader({ hideSiebar = false }) {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await axios.get('/api/points');
                setPoints(response.data.points || 0);
            } catch (error) {
                console.error("Failed to fetch points", error);
            }
        };
        fetchPoints();
    }, []);

    return (
        <div className='p-4 px-6 flex justify-between items-center glass-panel border-b border-white/40 sticky top-0 z-40 w-full backdrop-blur-xl bg-white/60'>
            <div className="flex items-center gap-4">
                {!hideSiebar && (
                    <div className="hover:bg-gray-100/50 p-1 rounded-lg transition-colors">
                        <SidebarTrigger className="text-gray-600 hover:text-primary" />
                    </div>
                )}
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hidden sm:block">
                    Dashboard
                </h1>
            </div>
            
            <div className="flex items-center gap-4">
                
                {/* Reward Points Badge */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-50 border border-amber-200 text-amber-700 font-extrabold text-sm shadow-sm cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                    <Coins className="w-5 h-5 text-amber-500 animate-pulse-slow" />
                    <span>{points} Pts</span>
                </div>

                <div className="hidden md:flex items-center space-x-2 bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-gray-600">Stable</span>
                </div>

                <div className="ring-2 ring-primary/20 rounded-full p-0.5 hover:ring-primary/50 transition-all cursor-pointer">
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 rounded-full border border-gray-200"
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}

export default AppHeader