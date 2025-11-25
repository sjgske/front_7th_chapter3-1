import React from 'react';
import { cn } from '@/lib/utils';

// Textarea Component - Yet another inconsistent API
interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}) => {
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

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(
          "w-full min-h-24 px-3.5 py-4 text-base text-black border rounded bg-white box-border transition-colors outline-none resize-y",
          "focus:border-blue-600 focus:border-2 focus:px-[13px] focus:py-[15px]",
          "disabled:bg-gray-300/50",
          error ? "border-destructive" : "border-gray-400/60"
        )}
      />

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