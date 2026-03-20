import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader({ hideSiebar = false }) {
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
                <div className="hidden md:flex items-center space-x-2 mr-4 bg-white/80 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-gray-600">All systems operational</span>
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