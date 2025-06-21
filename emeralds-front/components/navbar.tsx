"use client";
import { useState } from 'react';
import { BaggageClaim, Heart, ShoppingCart, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuList from './menu-list';
import ItemsMenuMobile from './items-menu-mobile';
import { useCart } from '@/hooks/use-cart';
import { useAuthStore } from '@/hooks/use-auth-store';
import LoginDialog from './login-dialog';

const Navbar = () => {
    const router = useRouter();
    const cart = useCart();
    const { isLoggedIn, user, logout } = useAuthStore();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    const handleUserClick = () => {
        if (isLoggedIn) {
            router.push('/profile');
        } else {
            setIsLoginDialogOpen(true);
        }
    };

    return (
        <>
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
                <div className="flex items-center gap-4">
                    {cart.items.length === 0 ? (
                        <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push('/cart')} />
                    ) : (
                        <div className="flex gap-1" onClick={() => router.push('/cart')}>
                            <BaggageClaim strokeWidth="1" className="cursor-pointer" />
                            <span className="text-xs text-gray-500">{cart.items.length}</span>
                        </div>
                    )}
                    <Heart strokeWidth="1" className="cursor-pointer" onClick={() => router.push('/wishlist')} />
                    
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                             <span className="text-sm font-medium">Hola, {user?.username}</span>
                            <LogOut strokeWidth="1" className="cursor-pointer" onClick={() => logout()} />
                        </div>
                    ) : (
                        <User strokeWidth="1" className="cursor-pointer" onClick={handleUserClick} />
                    )}
                </div>
            </div>
            <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
        </>
    );
}

export default Navbar;