"use client";
import Link from "next/link"; // Correct import for Link component
import { useState } from "react";
import Image from "next/image";  // Correct import for Next.js Image component
const Page: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");  // State for email or phone number
    const [password, setPassword] = useState<string>(""); // State for password

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Handle input change for email or phone number
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA10-Z]{2,}$/;
      const phonePattern = /^[0-9]{10,15}$/; // Adjust the phone pattern to match your expected phone number format
    let loginData;
    if (emailPattern.test(inputValue)) {
    loginData = { email: inputValue, password };
    } else if (phonePattern.test(inputValue)) {
    loginData = { phone: inputValue, password };
    } else {
        alert("Invalid input. Please enter a valid email or phone number.");
        return;
    }
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (data.access_token) {
              // Save the JWT token, for example in localStorage or cookies
            localStorage.setItem('jwt', data.access_token);
            alert('Login successful!');
              // Redirect user after successful login (e.g., to dashboard)
              window.location.href = '/dashboard'; // Modify this as per your app's flow
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error during login', error);
        alert('An error occurred during login');
    }
};
    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            {/* Content Wrapper */}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full flex-grow">
                <div>
                    <Image
                        src="/scooter-logo.png"
                        alt="scooter logo"
                        height={200}
                        width={200}
                        style={{ objectFit: 'contain' }}
                        className="rounded-full"
                    />
                </div>
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="inputField" className="block text-sm font-medium text-gray-900">
                                    Email or mobile phone number
                                </label>
                                <input
                                    type="text"  // We use type="text" to allow both email or phone number input
                                    name="inputField"
                                    id="inputField"
                                    value={inputValue}
                                    onChange={handleInputChange} // Handle the input change
                                    className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg p-2.5 w-full block"
                                    placeholder="name@company.com or phone number" // Placeholder text indicating either option
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Your password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg p-2.5 w-full block"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-400 hover:bg-blue-500 font-medium text-sm py-2.5 rounded-lg px-5 text-center"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>

                {/* This part is now outside the main form container */}
                <div className="mt-6 flex items-center justify-center w-full">
                    <hr className="flex-grow border-t-1 border-gray-300" style={{ maxWidth: '300px' }} />
                    <span className="mx-4 text-sm font-light text-gray-500">New to Shyle run?</span>
                    <hr className="flex-grow border-t-1 border-gray-300" style={{ maxWidth: '300px' }} />
                </div>

                {/* Link for creating an account */}
                <Link
                    href="/signup"
                    className="border border-gray-500 text-gray-500 px-6 py-2 rounded-lg text-center hover:bg-gray-200 transition duration-300 block mt-4"
                >
                    Create your account
                </Link>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white text-center py-4 mt-6">
                {/* Horizontal line to separate from above content */}
                <hr className="border-t-2 border-gray-500 mb-4" />
                
                <div className="space-x-6">
                    <a href="/conditions-of-use" className="text-sm hover:underline">
                        Conditions of Use
                    </a>
                    <a href="/privacy-notice" className="text-sm hover:underline">
                        Privacy Notice
                    </a>
                    <a href="/help" className="text-sm hover:underline">
                        Help
                    </a>
                </div>
                
                <div className="mt-4 text-sm">
                    © 2025, Shyle run.com, Inc. or its affiliates.
                </div>
            </footer>
        </section>
    );
};

export default Page;

