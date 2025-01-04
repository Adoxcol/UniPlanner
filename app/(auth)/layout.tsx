import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import '../globals.css';

import { neobrutalism } from '@clerk/themes'
const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
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
      <html lang="en">
        <body className={inter.className}>
        
          <div className="min-h-screen flex items-center justify-center bg-background">
          
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}