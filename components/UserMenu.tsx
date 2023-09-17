import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';

function UserMenu() {
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className='p-2 mr-4'>
                <div className='p-2 rounded-sm mb-2'>
                    <h1 className='font-bold leading-none truncate'>
                        Joshua Dela Cruz
                    </h1>
                    <p className='text-sm truncate'>kamotekid.dev@gmail.com</p>
                </div>
                <Button size='sm' className='w-full'>
                    Sign Out
                </Button>
            </PopoverContent>
        </Popover>
    );
}

export default UserMenu;
