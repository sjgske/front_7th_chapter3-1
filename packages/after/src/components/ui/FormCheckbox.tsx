import React from 'react';
import { cn } from '@/lib/utils';

// Checkbox Component - Completely different approach again
interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  hint,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-start mb-3 cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        onClick={handleClick}
      >
        <div className="relative mr-2 mt-0.5">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => {}} // Handled by onClick
            disabled={disabled}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <div
            className={cn(
              "h-4 w-4 border-2 border-gray-300 rounded-sm flex items-center justify-center transition-all cursor-pointer bg-white",
              checked && "bg-blue-600 border-blue-600",
              disabled && "cursor-not-allowed"
            )}
          >
            <span
              className={cn(
                "text-white text-[10px] font-bold",
                checked ? "block" : "hidden"
              )}
            >
              ✓
            </span>
          </div>
        </div>
        <label
          className={cn(
            "text-sm text-gray-700 cursor-pointer leading-normal select-none",
            error && "text-red-500",
            disabled && "cursor-not-allowed"
          )}
        >
          {label}
        </label>
      </div>

      {error && (
        <span className="text-red-500 text-xs mt-0.5 ml-6 block">
          {error}
        </span>
      )}
      {hint && !error && (
        <span className="text-gray-500 text-xs mt-0.5 ml-6 block">
          {hint}
        </span>
      )}
    </div>
  );
};