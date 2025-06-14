'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = memo(
  ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed? This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isLoading = false,
  }) => {
    const handleKeyPress = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      },
      [onClose]
    );

    const isDarkMode = true;

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyPress);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, handleKeyPress]);

    if (!isOpen) return null;

    const DialogContent = (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full max-w-md transform overflow-hidden rounded-lg p-6 text-left shadow-xl transition-all ${
              isDarkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-200'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute right-4 top-4">
              <button
                onClick={onClose}
                className="rounded-full cursor-pointer p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Close dialog"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-9">
              <h3 className="text-center text-lg font-semibold leading-6 mb-4" id="dialog-title">
                {title}
              </h3>
              <p className="text-sm text-center text-gray-400">{message}</p>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : confirmText}
              </button>
              <button
                type="button"
                className={`inline-flex cursor-pointer justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={onClose}
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

    return createPortal(DialogContent, document.body);
  }
);

ConfirmationDialog.displayName = 'ConfirmationDialog';

export default ConfirmationDialog;
