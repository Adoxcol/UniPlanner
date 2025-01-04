'use client';

import { useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react'; // For fallback icon
import { toast } from 'sonner'; // Import toast from sonner

export default function CustomUserButton() {
  const { user } = useUser(); // Get the authenticated user
  const { signOut } = useClerk(); // Get the signOut function
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  if (!user) {
    return null; // Don't render if the user is not authenticated
  }

  // Handle sign-out with a toast notification
  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    toast.success('You have been successfully signed out.'); // Show a toast notification
  };

  return (
    <div className="relative">
      {/* Custom Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {/* Profile Picture */}
        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl} // Use Clerk's profile image URL
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-500" /> // Fallback icon
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* View Profile Link */}
            <Link
              href="/profile" // Link to your custom profile page
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              View Profile
            </Link>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut} // Use the custom sign-out handler
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}