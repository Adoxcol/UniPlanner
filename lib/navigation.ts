import {  BookOpen, Users, ClipboardList, FileText } from 'lucide-react';

export const navigation = [
  
  { name: 'Your Plans', href: '/your-plans', icon: ClipboardList },
  { name: 'Universites', href: '/university', icon: ClipboardList },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  {
    name: 'Community',
    icon: Users,
    items: [
      { name: 'Forums', href: '/forum', icon: Users },
      { name: 'Templates', href: '/templates', icon: FileText },
    ],
  },
];

