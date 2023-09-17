'use client';

import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavlinkProps = { children: ReactNode } & LinkProps;
function NavLink(props: NavlinkProps) {
    const pathname = usePathname();

    return (
        <Link
            className={cn('transition-all duration-100 ease-linear', {
                'font-semibold': pathname === props.href,
            })}
            {...props}
        >
            {props.children}
        </Link>
    );
}

export default NavLink;
