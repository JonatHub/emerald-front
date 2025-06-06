"use client";
import { Heart, ShoppingCart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuList from './menu-list';
import ItemsMenuMobile from './items-menu-mobile';

const Navbar = () => {
    const router = useRouter();
    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-6xl">
            <h1 className="text-2xl" onClick={() => router.push('/')}>
                Alma
                <span className="text-green-500">Esmeralda</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
            <div className="flex items-center">
                <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push('/cart')} />
                <Heart strokeWidth="1" className="ml-4 cursor-pointer" onClick={() => router.push('/wishlist')} />
                <User strokeWidth="1" className="ml-4 cursor-pointer" onClick={() => router.push('/profile')} />
            </div>
        </div>
    )
}

export default Navbar;