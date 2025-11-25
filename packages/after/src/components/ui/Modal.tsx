import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

const sizeClasses = {
  small: 'w-full max-w-[400px]',
  medium: 'w-full max-w-[600px]',
  large: 'w-full max-w-[900px]',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showFooter = false,
  footerContent,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col",
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-black/10 flex justify-between items-center">
            <h3 className="m-0 text-xl font-medium text-black/90">
              {title}
            </h3>
            <button
              className="bg-none border-none text-[28px] leading-none text-black/60 cursor-pointer p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {children}
        </div>
        {showFooter && footerContent && (
          <div className="px-6 py-4 border-t border-black/10 flex gap-2 justify-end">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};
