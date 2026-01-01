import React from 'react';
import SignupForm from './SignupForm';

const RegisterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <SignupForm />

                <div className="mt-4 text-center">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Cancel and close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
