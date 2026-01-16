import { Link } from 'react-router-dom';

/**
 * Breadcrumb navigation component
 */
function Breadcrumb({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={item.to}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                  <span className="mx-2 text-tertiary" aria-hidden="true">
                    /
                  </span>
                </>
              ) : (
                <span className="text-primary font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
