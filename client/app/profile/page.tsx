"use client";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'; // Import icons

const Profile = () => {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-gray-700 to-black p-8">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-xl">
                <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <div className="text-white">
                {(user?.email?.split('@')[0]) || "John Doe"}
                <p className="text-blue-100">Software Developer</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                Passionate developer with experience in React and TypeScript. 
                Dedicated to creating elegant and efficient solutions through clean code 
                and modern development practices.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMail className="h-5 w-5 text-blue-500" />
                  <span>{user?.email || "john.doe@example.com"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMapPin className="h-5 w-5 text-blue-500" />
                  <span>New York, USA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiPhone className="h-5 w-5 text-blue-500" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile
