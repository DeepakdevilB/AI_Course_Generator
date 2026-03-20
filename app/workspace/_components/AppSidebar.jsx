"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog'

const SideBarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace/#'
    },
    {
        title: 'My Learning',
        icon: Book,
        path: '/workspace/my-learning'
    },
    {
        title: 'Explore Courses',
        icon: Compass,
        path: '/workspace/explore'
    },
    {
        title: 'Billing',
        icon: WalletCards,
        path: '/workspace/billing'
    },
    {
        title: 'Profile',
        icon: UserCircle2Icon,
        path: '/workspace/profile'
    }
]

function AppSidebar() {

    const path = usePathname();

    return (
        <Sidebar className="border-r border-gray-200/60 bg-white/40 glass-panel backdrop-blur-2xl">
            <SidebarHeader className="p-6 border-b border-gray-100/50">
                <div className="flex items-center space-x-3 group cursor-pointer">
                    <div className="bg-gradient-to-tr from-indigo-100 to-fuchsia-100 p-1.5 rounded-xl shadow-sm border border-white">
                        <Image src="/stickman.gif" alt="logo" width={36} height={36} className="rounded-lg mix-blend-multiply" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
                        CourseCraft
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4 py-6">
                <SidebarGroup className="mb-6">
                    <AddNewCourseDialog>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 group">
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            <span className="font-semibold text-base">Create Course</span>
                        </Button>
                    </AddNewCourseDialog>
                </SidebarGroup>
                
                <SidebarGroup>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Main Menu</div>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1.5">
                            {SideBarOptions.map((item, index) => {
                                const isActive = path.includes(item.path) || (item.path === '/workspace/#' && path === '/workspace')
                                return (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild className={`p-3 rounded-xl transition-all duration-200 w-full h-auto ${isActive ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' : 'text-gray-600 hover:bg-gray-100/60 hover:text-gray-900'}`}>
                                            <Link href={item.path} className="flex items-center space-x-3 w-full">
                                                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-indigo-100/80 text-indigo-700' : 'bg-transparent text-gray-500'}`}>
                                                    <item.icon className='h-5 w-5' />
                                                </div>
                                                <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t border-gray-100/50">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100/50">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Pro Plan Info</span>
                    </div>
                    <p className="text-xs text-indigo-700/80 mb-3 font-medium">Unlock unlimited AI generations and premium templates.</p>
                    <Link href="/workspace/billing">
                        <Button variant="outline" size="sm" className="w-full text-xs font-semibold text-indigo-700 bg-white border-white shadow-sm hover:bg-indigo-50 transition-colors">
                            Upgrade Now
                        </Button>
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar