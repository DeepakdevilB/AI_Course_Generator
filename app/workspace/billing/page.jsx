import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
    return (
        <div className="animate-fade-in-up max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h2 className='font-extrabold text-4xl tracking-tight text-gray-900 mb-3'>Select Your Plan</h2>
                <p className="text-gray-500 font-medium max-w-xl mx-auto">Unlock your full learning potential with premium AI features, unlimited courses, and priority access to new models.</p>
            </div>
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/40 border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
                <div className="relative z-10 flex justify-center w-full">
                    <PricingTable newSubscriptionRedirectUrl='/workspace' />
                </div>
            </div>
        </div>
    )
}

export default Billing