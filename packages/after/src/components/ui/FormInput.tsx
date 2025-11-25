import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: 'small' | 'medium' | 'large' | 'full';
  fieldType?: 'username' | 'email' | 'postTitle' | 'slug' | 'normal';
  entityType?: 'user' | 'post';
  checkBusinessRules?: boolean;
}

const widthClasses = {
  small: 'w-[200px]',
  medium: 'w-[300px]',
  large: 'w-[400px]',
  full: 'w-full',
};

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  width = 'full',
  fieldType = 'normal',
  entityType,
  checkBusinessRules = false,
}) => {
  const [internalError, setInternalError] = useState('');

  const validateField = (val: string) => {
    setInternalError('');

    if (!val) return;

    // 기본 필드 타입 검증
    if (fieldType === 'username') {
      if (val.length < 3) {
        setInternalError('사용자명은 3자 이상이어야 합니다');
      } else if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        setInternalError('영문, 숫자, 언더스코어만 사용 가능합니다');
      } else if (val.length > 20) {
        setInternalError('사용자명은 20자 이하여야 합니다');
      }

      // 도메인 특화 검증: 예약어 체크
      if (checkBusinessRules) {
        const reservedWords = ['admin', 'root', 'system', 'administrator'];
        if (reservedWords.includes(val.toLowerCase())) {
          setInternalError('예약된 사용자명입니다');
        }
      }
    } else if (fieldType === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setInternalError('올바른 이메일 형식이 아닙니다');
      }

      // 비즈니스 규칙: User 엔티티의 이메일은 회사 도메인만
      if (checkBusinessRules && entityType === 'user') {
        if (!val.endsWith('@company.com') && !val.endsWith('@example.com')) {
          setInternalError('회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다');
        }
      }
    } else if (fieldType === 'postTitle') {
      if (val.length < 5) {
        setInternalError('제목은 5자 이상이어야 합니다');
      } else if (val.length > 100) {
        setInternalError('제목은 100자 이하여야 합니다');
      }

      // 비즈니스 규칙: 금칙어 체크
      if (checkBusinessRules && entityType === 'post') {
        const bannedWords = ['광고', '스팸', '홍보'];
        const hasBannedWord = bannedWords.some(word => val.includes(word));
        if (hasBannedWord) {
          setInternalError('제목에 금지된 단어가 포함되어 있습니다');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validateField(newValue);
  };

  const displayError = error || internalError;

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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(
          "px-2.5 py-2 text-sm text-black border rounded-sm bg-white transition-colors box-border",
          "focus:border-blue-600 focus:outline-none",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          displayError ? "border-destructive" : "border-gray-300",
          widthClasses[width]
        )}
      />

      {displayError && (
        <span className="text-destructive text-xs mt-1 block">
          {displayError}
        </span>
      )}
      {helpText && !displayError && (
        <span className="text-gray-600 text-xs mt-1 block">
          {helpText}
        </span>
      )}
    </div>
  );
};
