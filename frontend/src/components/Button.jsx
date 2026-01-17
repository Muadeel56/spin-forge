import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { hoverScale, pressScale } from '@/motion/variants';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  preventDoubleClick = true,
  ...props
}) {
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = useCallback(async (e) => {
    if (!onClick || isClicking || loading || disabled) return;
    
    if (preventDoubleClick) {
      setIsClicking(true);
      try {
        await onClick(e);
      } finally {
        setIsClicking(false);
      }
    } else {
      onClick(e);
    }
  }, [onClick, isClicking, loading, disabled, preventDoubleClick]);

  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600',
    secondary:
      'bg-tertiary text-primary border border-theme hover:bg-tertiary/80 focus:ring-primary-600',
    ghost:
      'bg-transparent text-primary hover:bg-tertiary focus:ring-primary-600',
    accent:
      'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-600',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;
  const isDisabled = disabled || loading || isClicking;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      onClick={handleClick}
      whileHover={!isDisabled ? hoverScale : {}}
      whileTap={!isDisabled ? pressScale : {}}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="sm" className="mr-2" />
      )}
      {children}
    </motion.button>
  );
}

export default Button;
