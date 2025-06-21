"use client";
import { BaggageClaim, Heart, ShoppingCart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuList from './menu-list';
import ItemsMenuMobile from './items-menu-mobile';
import { useCart } from '@/hooks/use-cart';

const Navbar = () => {
    const router = useRouter();
    const cart = useCart()
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
                {cart.items.length === 0 ?
                    <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push('/cart')} />
                    : <div className="flex gap-1" onClick={() => router.push('/cart')}>
                        <BaggageClaim strokeWidth="1" className="cursor-pointer" />
                        <span className="text-xs text-gray-500">{cart.items.length}</span>
                    </div>
                }
                <Heart strokeWidth="1" className="ml-4 cursor-pointer" onClick={() => router.push('/wishlist')} />
                <User strokeWidth="1" className="ml-4 cursor-pointer" onClick={() => router.push('/profile')} />
            </div>
        </div>
    )
}

export default Navbar;