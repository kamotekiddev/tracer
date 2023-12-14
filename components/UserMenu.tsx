'use client';

import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';

function UserMenu() {
    const { data: session } = useSession();

    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    {session?.user?.image && (
                        <AvatarImage src={session?.user?.image} />
                    )}
                    <AvatarFallback>
                        {session?.user?.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className='p-2 mr-4'>
                <div className='p-2 rounded-sm mb-2'>
                    <h1 className='font-bold leading-none truncate'>
                        {session?.user?.name}
                    </h1>
                    <p className='text-sm truncate'>{session?.user?.email}</p>
                </div>
                <Button onClick={() => signOut()} size='sm' className='w-full'>
                    Sign Out
                </Button>
            </PopoverContent>
        </Popover>
    );
}

export default UserMenu;
