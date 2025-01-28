"use client"
import React, { useState } from "react";
import { Checkbox } from "@/src/components/ui/checkbox";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";

const Sidebar: React.FC = () => {
    const [sidebar , setsidebar] = useState(false)
    const side = () =>{ setsidebar(!sidebar) }
  
  return (
    <div className="">
        <div className="relative">
      {/* Toggle Button */}
      <div className="md:hidden sm:block lg:hidden block">
        <button
          onClick={side}
          className="p-2 text-gray-700 bg-gray-200 rounded-md shadow-md fixed top-4 left-4 z-20"
        >
          {sidebar ? <IoClose size={24} /> : <FaBars size={24} />}
        </button>

        {/* Sidebar */}
        {sidebar && (
          <div className="fixed top-0 left-0  h-full bg-white p-4 border-r border-gray-300 transform transition-transform duration-300 ease-in-out z-10 sm:w-[250px]">
            <h2 className="text-lg font-bold mb-4 mt-[2cm]">Filters</h2>

            {/* TYPE Section */}
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">TYPE</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none"
                    >
                      Sport
                    </label>
                  </div>
                  <span className="text-gray-500">(2)</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sedan" />
                    <label
                      htmlFor="sedan"
                      className="text-sm font-medium leading-none"
                    >
                      Sedan
                    </label>
                  </div>
                  <span className="text-gray-500">(1)</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="suv" />
                    <label
                      htmlFor="suv"
                      className="text-sm font-medium leading-none"
                    >
                      SUV
                    </label>
                  </div>
                  <span className="text-gray-500">(4)</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hatchback" />
                    <label
                      htmlFor="hatchback"
                      className="text-sm font-medium leading-none"
                    >
                      Hatchback
                    </label>
                  </div>
                  <span className="text-gray-500">(1)</span>
                </li>
              </ul>
            </div>

            {/* CAPACITY Section */}
            <div>
              <h3 className="text-md font-semibold mb-3">CAPACITY</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="2-people" />
                    <label
                      htmlFor="2-people"
                      className="text-sm font-medium leading-none"
                    >
                      2 People
                    </label>
                  </div>
                  <span className="text-gray-500">(2)</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="4-people" />
                    <label
                      htmlFor="4-people"
                      className="text-sm font-medium leading-none"
                    >
                      4 People
                    </label>
                  </div>
                  <span className="text-gray-500">(1)</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="6-people" />
                    <label
                      htmlFor="6-people"
                      className="text-sm font-medium leading-none"
                    >
                      6 People
                    </label>
                  </div>
                  <span className="text-gray-500">(5)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>

    <div className=" bg-white p-4 border-r border-gray-300 sm:hidden md:block hidden">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* TYPE Section */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3">TYPE</h3>
        <ul className="space-y-2">
       
        <li className="flex items-center justify-between">
        <Link href="/Gasoline">
            <div className="flex items-center space-x-2">
            
              <Checkbox id="terms" />  
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
               Gasoline
              </label>
            </div></Link>
            <span className="text-gray-500">(2)</span>
          </li>

        <li className="flex items-center justify-between">
        <Link href="/Diesel">
            <div className="flex items-center space-x-2">
            
              <Checkbox id="terms" />  
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Diesel
              </label>
            </div></Link>
            <span className="text-gray-500">(2)</span>
          </li>
          <li className="flex items-center justify-between">
          <Link href="/Sport">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sport
              </label>
            </div></Link>
            <span className="text-gray-500">(2)</span>
          </li>
          
          

          <li className="flex items-center justify-between">
          <Link href="/Electric">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
               Electric
              </label>
            </div></Link>
            <span className="text-gray-500">(2)</span>
          </li>
          <li className="flex items-center justify-between">
            <Link href="/Sedan">
            <div className="flex items-center space-x-2">
              <Checkbox id="sedan" />
              <label
                htmlFor="sedan"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sedan
              </label>
            </div></Link>
            <span className="text-gray-500">(1)</span>
          </li>
          <li className="flex items-center justify-between">
            <Link href="/SUV">
            <div className="flex items-center space-x-2">
              <Checkbox id="suv" />
              <label
                htmlFor="suv"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                SUV
              </label>
            </div></Link>
            <span className="text-gray-500">(4)</span>
          </li>
          <li className="flex items-center justify-between">
          <Link href="/Hatchback"> 
            <div className="flex items-center space-x-2">
              
              <Checkbox id="hatchback" />
              <label
                htmlFor="hatchback"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Hatchback
              </label>
            </div></Link>
            <span className="text-gray-500">(1)</span>
          </li>
          <li className="flex items-center justify-between">
          <Link href="/Hybrid"> 
            <div className="flex items-center space-x-2">
              
              <Checkbox id="hatchback" />
              <label
                htmlFor="hatchback"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Hybrid
              </label>
            </div></Link>
            <span className="text-gray-500">(1)</span>
          </li>
          
        </ul>
      </div>

      {/* CAPACITY Section */}
      <div>
        <h3 className="text-md font-semibold mb-3">CAPACITY</h3>
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <Link href="/2seater">
            <div className="flex items-center space-x-2">
              <Checkbox id="2-people" />
              <label
                htmlFor="2-people"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                2 People
              </label>
            </div></Link>
            <span className="text-gray-500">(2)</span>
          </li>
          <Link href="/4seater">
          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="4-people" />
              <label
                htmlFor="4-people"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                4 People
              </label>
            </div>
            <span className="text-gray-500">(1)</span>
          </li></Link>
          <Link href="/5seater">
          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="5-people" />
              <label
                htmlFor="5-people"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                5 People
              </label>
            </div>
            <span className="text-gray-500">(5)</span>
          </li></Link>
          <Link href="/6seater">
          <li className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="6-people" />
              <label
                htmlFor="6-people"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                6 People
              </label>
            </div>
            <span className="text-gray-500">(6)</span>
          </li></Link>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
