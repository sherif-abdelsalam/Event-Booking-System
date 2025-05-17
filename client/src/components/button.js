import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    isLoading = false,
    className = '',
    icon,
    type = 'button',
}) => {
    // Variant styles
    const variantStyles = {
        primary: 'bg-primary hover:bg-primary-dark text-white',
        outline: 'bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700',
        destructive: 'bg-red-600 hover:bg-red-700 text-white',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
        link: 'bg-transparent text-primary hover:underline p-0',
    };

    // Size styles
    const sizeStyles = {
        small: 'py-1 px-3 text-sm',
        medium: 'py-2 px-4 text-base',
        large: 'py-3 px-6 text-lg',
    };

    // Combined classes
    const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 inline-flex items-center justify-center gap-2';
    const disabledClasses = 'opacity-50 cursor-not-allowed';
    const buttonClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled || isLoading ? disabledClasses : ''} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={buttonClasses}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    <span>{children}</span>
                </>
            )}
        </button>
    );
};

export default Button;