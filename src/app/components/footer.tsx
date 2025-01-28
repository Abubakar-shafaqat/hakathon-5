import React from 'react';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-8 px-6 w-full bg-white py-8 shadow-sm">
      {/* Main Section */}
      <div className="first w-full flex flex-wrap items-start justify-between gap-8">
        {/* Intro Section */}
        <div className="intro flex flex-col gap-3 w-full lg:w-1/3">
          <h1 className="text-[#3563e9] text-2xl lg:text-3xl font-bold text-center lg:text-left">MORENT</h1>
          <p className="text-gray-500 text-center lg:text-left">
            Our vision is to provide convenience and help increase your sales business.
          </p>
        </div>

        {/* Links Section */}
        <div className="lists flex flex-wrap gap-8 justify-center lg:justify-end w-full lg:w-2/3">
          {/* About */}
          <div className="about">
            <ul className="flex flex-col gap-2">
              <li className="font-bold text-lg text-gray-800">About</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">How it works</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Featured</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Partnership</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Business Relation</li>
            </ul>
          </div>
          {/* Community */}
          <div className="community">
            <ul className="flex flex-col gap-2">
              <li className="font-bold text-lg text-gray-800">Community</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Events</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Blog</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Podcast</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Invite a friend</li>
            </ul>
          </div>
          {/* Socials */}
          <div className="socials">
            <ul className="flex flex-col gap-2">
              <li className="font-bold text-lg text-gray-800">Socials</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Discord</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Instagram</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Facebook</li>
              <li className="text-gray-600 hover:text-blue-500 cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="line border-t w-full border-gray-200"></div>

      {/* Footer Bottom Section */}
      <div className="last w-full flex flex-wrap items-center justify-between gap-4">
        {/* Left Section */}
        <div className="first text-center lg:text-left w-full lg:w-auto">
          <h1 className="font-bold text-sm text-gray-600">©2022 MORENT. All rights reserved</h1>
        </div>
        {/* Right Section */}
        <div className="second flex flex-wrap justify-center lg:justify-end items-center gap-4 w-full lg:w-auto">
          <h1 className="font-bold text-sm text-gray-600 hover:text-blue-500 cursor-pointer">Privacy & Policy</h1>
          <h1 className="font-bold text-sm text-gray-600 hover:text-blue-500 cursor-pointer">Terms & Conditions</h1>
        </div>
      </div>
    </footer>
  );
}
