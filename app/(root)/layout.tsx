import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/Theme/theme-provider';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


import { Navigation } from '@/components/Theme/navigation';
import {  neobrutalism } from '@clerk/themes'
import { Toaster } from 'sonner';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UniPlanner - Your All-in-One University Hub',
  description: 'Plan your degree, track your progress, and connect with fellow students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: neobrutalism,
    }}
    >
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="min-h-screen bg-background">
          
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
            <Toaster position="top-center" />
          </div>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}