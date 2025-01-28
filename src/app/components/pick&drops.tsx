import { GoArrowDown } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";

const BookingForm: React.FC = () => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between sm:grid sm:grid-cols-1 gap-12  sm:p-6 lg:p-8 bg-gray-100 ">
      {/* Pick-Up Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-5 object-cover justify-between  lg:w-[49%]">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="pickup"
            name="bookingType"
            className="text-blue-500"
            defaultChecked
          />
          <label htmlFor="pickup" className="font-medium text-gray-700">
            Pick-Up
          </label>
        </div>
        <div className="flex gap-4 flex-wrap">
          {/* Location Input */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3">
            <label className="font-medium text-gray-600 text-sm md:text-nowrap">Enter Location</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
              placeholder="Enter location (e.g., City, Country)"
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3">
            <label className="font-medium text-gray-600 text-sm md:text-nowrap">Select Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            />
          </div>

          {/* Custom Time Picker */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3">
            <label className="font-medium text-gray-600 text-sm md:text-nowrap">Select Time</label>
            <div className="md:flex items-center gap-2 space-y-3 space-x-1 lg:space-y-0 lg:space-x-3">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                <option value="">Hour</option>
                {[...Array(12).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                <option value="">Minute</option>
                {[...Array(60).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i < 10 ? `0${i}` : i}
                  </option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>

     { /* Swap Button */}
<div className="flex items-center justify-center py-6">
  <button
    className="w-14 h-14 bg-blue-500 text-white z-10 rounded-xl shadow-md flex items-center justify-center"
    aria-label="Swap Pick-Up and Drop-Off"
    onClick={() => window.location.reload()} 
  >
    <GoArrowDown size={24} />
    <GoArrowUp size={24} />
  </button>
</div>

      {/* Drop-Off Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-5 justify-between w-full lg:w-[45%]">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="dropoff"
            name="bookingType"
            className="text-blue-500"
          />
          <label htmlFor="dropoff" className="font-medium text-gray-700">
            Drop-Off
          </label>
        </div>
        <div className="flex gap-4 flex-wrap">
          {/* Location Input */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3">
            <label className="font-medium text-gray-600 text-sm md:text-nowrap">Enter Location</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
              placeholder="Enter location (e.g., City, Country)"
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col w-full sm:w-1/2 md:w-1/3">
            <label className="font-medium text-gray-600 text-sm md:text-nowrap">Select Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            />
          </div>

          {/* Custom Time Picker */}
          <div className="md:flex flex-col w-full sm:w-1/2 md:w-1/3">
            <label className="font-medium text-gray-600 text-sm md:text-nowrap">Select Time</label>
            <div className="md:flex items-center gap-2 space-y-3 space-x-1 lg:space-y-0 lg:space-x-3">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                <option value="">Hour</option>
                {[...Array(12).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                <option value="">Minute</option>
                {[...Array(60).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i < 10 ? `0${i}` : i}
                  </option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-gray-700">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
