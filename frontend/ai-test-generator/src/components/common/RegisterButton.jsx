import React, { useState } from 'react';
import RegisterModal from '../user/RegisterModal';

const RegisterButton = ({ children, className = '' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ${className}`}
            >
                {children || 'Register'}
            </button>

            <RegisterModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default RegisterButton;
