import { Link } from '@tanstack/react-router';

interface BreadcrumbItem {
  label: string;
  to?: string;
  params?: Record<string, string>;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="text-gray-500 mx-2" aria-hidden="true">
                ›
              </span>
            )}
            {item.to ? (
              <Link
                to={item.to}
                params={item.params as any}
                className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
