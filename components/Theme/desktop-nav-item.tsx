import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  items?: { name: string; href: string; icon: React.ElementType }[];
}

interface DesktopNavItemProps {
  item: NavItem;
  pathname: string;
}

export function DesktopNavItem({ item, pathname }: DesktopNavItemProps) {
  if ('items' in item) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1">
            <item.icon className="h-4 w-4" />
            {item.name}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {item.items?.map((subItem) => (
            <DropdownMenuItem key={subItem.name} asChild>
              <Link href={subItem.href} className="flex items-center gap-2">
                <subItem.icon className="h-4 w-4" />
                {subItem.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={`flex items-center gap-1 text-sm font-semibold leading-6 ${
        pathname === item.href
          ? 'text-primary'
          : 'text-muted-foreground hover:text-primary'
      }`}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </Link>
  );
}

