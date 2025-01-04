'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { navigation } from '@/lib/navigation';
import { GraduationCap, Menu, User, X } from 'lucide-react';
import { DesktopNavItem } from './desktop-nav-item';
import { MobileNavItem } from './mobile-nav-item';
import { ModeToggle } from './mode-toggle';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import CustomUserButton from '../Auth/CustomUserButton';
 // Import the custom button

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-background border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="font-bold text-xl">UniPlanner</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <DesktopNavItem key={item.name} item={item} pathname={pathname} />
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <ModeToggle />
          <SignedIn>
            {/* Replace <UserButton /> with CustomUserButton */}
            <CustomUserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                <GraduationCap className="h-8 w-8" />
                <span className="font-bold text-xl">UniPlanner</span>
              </Link>
              <Button
                variant="ghost"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <MobileNavItem
                      key={item.name}
                      item={item}
                      pathname={pathname}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex items-center justify-between">
                    <ModeToggle />
                    <SignedIn>
                      {/* Replace <UserButton /> with CustomUserButton */}
                      <CustomUserButton />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton>
                        <Button variant="ghost" size="icon">
                          <User className="h-5 w-5" />
                          <span className="sr-only">Sign in</span>
                        </Button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}