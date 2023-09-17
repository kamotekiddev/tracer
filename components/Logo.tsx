import { Bug } from 'lucide-react';
import React from 'react';

function Logo() {
    return (
        <div className='flex gap-2 items-center'>
            <Bug />
            <h1 className='text-xl font-black'>Tracer</h1>
        </div>
    );
}

export default Logo;
