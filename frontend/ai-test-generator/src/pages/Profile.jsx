import { useState, useEffect, useRef } from 'react';
import { FiUser, FiMail, FiKey, FiSave, FiEdit2, FiLogOut, FiCamera, FiX } from 'react-icons/fi';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        joinDate: '2023-01-15',
    });
    const [formData, setFormData] = useState({ ...userData });
    const [avatarPreview, setAvatarPreview] = useState('https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=128');
    const fileInputRef = useRef(null);

    // Simulate fetching user data
    useEffect(() => {
        // In a real app, you would fetch this from your API
        // const fetchUserData = async () => {
        //   const response = await fetch('/api/users/me');
        //   const data = await response.json();
        //   setUserData(data);
        //   setFormData(data);
        // };
        // fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this to your API
        // const formDataToSend = new FormData();
        // formDataToSend.append('userData', JSON.stringify(formData));
        // if (fileInputRef.current?.files[0]) {
        //   formDataToSend.append('avatar', fileInputRef.current.files[0]);
        // }
        // await fetch('/api/users/me', {
        //   method: 'PUT',
        //   body: formDataToSend
        // });
        setUserData({ ...formData });
        setIsEditing(false);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeAvatar = (e) => {
        e.stopPropagation();
        setAvatarPreview('https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.fullName) + '&background=3b82f6&color=fff&size=128');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleLogout = () => {
        // In a real app, you would clear the auth token and redirect
        // localStorage.removeItem('token');
        // window.location.href = '/login';
        console.log('User logged out');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg leading-6 font-medium text-white">
                                User Profile
                            </h3>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FiEdit2 className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...userData });
                                            setIsEditing(false);
                                        }}
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        form="profile-form"
                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <FiSave className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <form id="profile-form" onSubmit={handleSubmit}>
                            {/* Profile Picture Section */}
                            <div className="flex flex-col items-center py-6 border-b border-gray-200">
                                <div className="relative group">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                                        <img
                                            src={avatarPreview}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        {isEditing && (
                                            <>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleAvatarChange}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                                <div
                                                    onClick={triggerFileInput}
                                                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                                                >
                                                    <FiCamera className="text-white text-xl mb-1" />
                                                    <span className="text-white text-xs">Change</span>
                                                </div>
                                                {avatarPreview && !avatarPreview.includes('ui-avatars.com') && (
                                                    <button
                                                        type="button"
                                                        onClick={removeAvatar}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <FiX className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                {isEditing && (
                                    <p className="mt-2 text-sm text-gray-500 text-center">
                                        Click on the image to change your profile picture
                                    </p>
                                )}
                            </div>

                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <FiUser className="mr-2 h-5 w-5" /> Full name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            userData.fullName
                                        )}
                                    </dd>
                                </div>

                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <FiMail className="mr-2 h-5 w-5" /> Email address
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            userData.email
                                        )}
                                    </dd>
                                </div>

                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Username
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {userData.username}
                                    </dd>
                                </div>

                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Member since
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {new Date(userData.joinDate).toLocaleDateString()}
                                    </dd>
                                </div>

                                {isEditing && (
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            <FiSave className="mr-2 h-5 w-5" />
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...userData });
                                                setIsEditing(false);
                                            }}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </dl>
                        </form>
                    </div>
                </div>

                <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Account Settings
                        </h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <FiKey className="mr-2 h-5 w-5" /> Change Password
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        Update password
                                    </button>
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Logout
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center text-red-600 hover:text-red-800"
                                    >
                                        <FiLogOut className="mr-2 h-5 w-5" />
                                        Sign out of your account
                                    </button>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
