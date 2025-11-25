import React from 'react';
import { cn } from '@/lib/utils';

// Select Component - Inconsistent with Input component
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'md',
}) => {
  void size; // Keep for API consistency but not used in rendering

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1.5 text-gray-700 text-sm font-bold"
        >
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={cn(
          "w-full px-2.5 py-2 text-sm text-black border rounded-sm bg-white transition-colors box-border",
          "focus:border-blue-600 focus:outline-none",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          error ? "border-destructive" : "border-gray-300"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-destructive text-xs mt-1 block">
          {error}
        </span>
      )}
      {helpText && !error && (
        <span className="text-gray-600 text-xs mt-1 block">
          {helpText}
        </span>
      )}
    </div>
  );
};