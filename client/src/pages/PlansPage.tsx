import React from "react";

const PlansPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12">
      {/* Header */}
      <h1 className="text-5xl font-bold mb-6">Choose the plan that’s right for you</h1>
      <p className="text-lg mb-8 text-gray-300 text-center max-w-3xl">
        Watch all you want. Cancel anytime. Choose from three flexible plans to suit your needs.
      </p>

      {/* Plan Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Basic Plan */}
        <div className="bg-gray-800 border-2 border-gray-700 p-8 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
          <p className="text-3xl font-bold mb-4">$8.99<span className="text-sm"> / month</span></p>
          <ul className="text-gray-400 text-left mb-6 space-y-2">
            <li>✔ 720p Resolution</li>
            <li>✔ 1 Screen at a time</li>
            <li>✔ Unlimited Movies and TV Shows</li>
          </ul>
          <button className="bg-red-600 py-2 px-6 text-white rounded hover:bg-red-700 transition duration-300">
            Choose Plan
          </button>
        </div>

        {/* Standard Plan */}
        <div className="bg-gray-800 border-2 border-gray-700 p-8 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold mb-4">Standard Plan</h2>
          <p className="text-3xl font-bold mb-4">$13.99<span className="text-sm"> / month</span></p>
          <ul className="text-gray-400 text-left mb-6 space-y-2">
            <li>✔ 1080p Resolution</li>
            <li>✔ 2 Screens at a time</li>
            <li>✔ Unlimited Movies and TV Shows</li>
          </ul>
          <button className="bg-red-600 py-2 px-6 text-white rounded hover:bg-red-700 transition duration-300">
            Choose Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gray-800 border-2 border-gray-700 p-8 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
          <p className="text-3xl font-bold mb-4">$17.99<span className="text-sm"> / month</span></p>
          <ul className="text-gray-400 text-left mb-6 space-y-2">
            <li>✔ 4K+HDR Resolution</li>
            <li>✔ 4 Screens at a time</li>
            <li>✔ Unlimited Movies and TV Shows</li>
          </ul>
          <button className="bg-red-600 py-2 px-6 text-white rounded hover:bg-red-700 transition duration-300">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;