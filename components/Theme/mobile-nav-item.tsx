import Link from 'next/link';

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  items?: { name: string; href: string; icon: React.ElementType }[];
}

interface MobileNavItemProps {
  item: NavItem;
  pathname: string;
  onClose: () => void;
}

export function MobileNavItem({ item, pathname, onClose }: MobileNavItemProps) {
  if ('items' in item) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-3 text-sm font-semibold text-muted-foreground">
          <item.icon className="h-4 w-4" />
          {item.name}
        </div>
        {item.items?.map((subItem) => (
          <Link
            key={subItem.name}
            href={subItem.href}
            className="flex items-center gap-2 pl-8 py-2 text-sm font-semibold text-muted-foreground hover:text-primary"
            onClick={onClose}
          >
            <subItem.icon className="h-4 w-4" />
            {subItem.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold ${
        pathname === item.href
          ? 'text-primary'
          : 'text-muted-foreground hover:text-primary'
      }`}
      onClick={onClose}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </Link>
  );
}

