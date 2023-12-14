import Logo from './Logo';
import UserMenu from './UserMenu';
import NavLink from './NavLink';

const Header = () => {
    return (
        <header className='p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-8 items-center'>
                    <Logo />
                    <nav>
                        <ul className='flex gap-4'>
                            <li>
                                <NavLink href='/home'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink href='/projects'>Projects</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
