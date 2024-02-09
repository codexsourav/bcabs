// Button.tsx

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Add any additional props you want to support
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string,
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
    // Define Tailwind CSS classes based on the variant
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-orange-500 text-white';
            case 'secondary':
                return 'bg-gray-300 text-gray-700';
            case 'danger':
                return 'bg-red-500 text-white';
            default:
                return 'bg-orange-500 text-white';
        }
    };

    return (
        <button
            className={`px-4 py-2 rounded ${getVariantClasses()} ${className}`}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;
