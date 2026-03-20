import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight, Sparkles, GraduationCap, Zap, Infinity as InfinityIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#fafafa] text-gray-900 font-sans selection:bg-primary/20">

      {/* Dynamic Animated Background Blobs */}
      <div className="blob-bg bg-purple-300/40 w-[600px] h-[600px] rounded-full top-[-100px] left-[-200px] animate-blob"></div>
      <div className="blob-bg bg-indigo-300/40 w-[500px] h-[500px] rounded-full bottom-[-100px] right-[-100px] animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="blob-bg bg-pink-300/40 w-[400px] h-[400px] rounded-full top-[40%] left-[30%] animate-blob" style={{ animationDelay: '4s' }}></div>
      
      {/* Light Mesh Overlay */}
      <div className="absolute inset-0 z-[-5] h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 mask-image:linear-gradient(to_bottom,white,transparent)"></div>

      {/* Premium Glass Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full glass-panel border-b-0 border-white/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span className="self-center whitespace-nowrap text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tight">
              CourseCraft<span className="text-primary">.ai</span>
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 mr-4">
              <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
              <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
              <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            </div>
            <Link href="/workspace">
              <Button className="rounded-full px-6 bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-0.5" size="sm">
                Dashboard
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex min-h-screen w-full items-center justify-center pt-28 pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
            
            {/* Text Content */}
            <div className="text-center lg:text-left lg:w-1/2 flex flex-col items-center lg:items-start">
              <div 
                className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-8 animate-fade-in-up border border-indigo-100/50 shadow-sm"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-semibold text-indigo-700">Next-gen AI Learning Platform</span>
              </div>
              
              <h1
                className="animate-fade-in-up text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
              >
                Learn Smarter. <br/>
                <span className="gradient-text pb-2 inline-block">Grow Faster.</span>
              </h1>
              
              <p
                className="animate-fade-in-up mt-6 text-lg md:text-xl text-gray-600 max-w-2xl font-light leading-relaxed"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              >
                Transform your educational journey with hyper-personalized courses. 
                Our AI analyzes your learning style to curate smart lessons, interactive challenges, 
                and feedback that actually works.
              </p>
              
              <div
                className="animate-fade-in-up mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
              >
                <Link href="/workspace">
                  <Button size="lg" className="h-14 rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 text-base font-semibold w-full sm:w-auto">
                    Start Learning For Free
                    <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="h-14 rounded-full px-8 bg-white/50 border-gray-200 hover:bg-white/80 backdrop-blur-sm text-gray-700 transition-all hover:-translate-y-1 text-base font-semibold w-full sm:w-auto shadow-sm">
                    Watch Demo
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div 
                className="animate-fade-in-up mt-12 flex items-center gap-6 pt-8 border-t border-gray-200/60 w-full justify-center lg:justify-start"
                style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-900">10k+</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Learners</span>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-900">99%</span>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</span>
                </div>
              </div>
            </div>

            {/* Visual Feature Showcase */}
            <div className="lg:w-1/2 w-full max-w-2xl relative">
              <div 
                className="relative animate-fade-in-up w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center p-8" 
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
              >
                {/* Decorative background for the image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6 border border-white/60 shadow-2xl shadow-indigo-200/40 -z-10"></div>
                
                <div className="glass-panel w-full h-full rounded-[2.5rem] overflow-hidden relative flex items-center justify-center border border-white p-4 group">
                  <Image
                    src="/studying.gif" 
                    alt="AI Learning Illustration"
                    width={800}
                    height={800}
                    className="object-contain w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  
                  {/* Floating Elements Over Image */}
                  <div className="absolute top-8 right-8 glass-panel px-4 py-3 rounded-2xl animate-float shadow-lg flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Skill Unlocked</p>
                      <p className="text-[10px] text-gray-500">+50 XP</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-12 left-6 glass-panel px-4 py-3 rounded-2xl animate-float shadow-lg flex items-center space-x-3" style={{ animationDelay: '1.5s' }}>
                    <div className="bg-purple-100 p-2 rounded-full">
                      <InfinityIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">AI Generated</p>
                      <p className="text-[10px] text-gray-500">Perfect Match</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
