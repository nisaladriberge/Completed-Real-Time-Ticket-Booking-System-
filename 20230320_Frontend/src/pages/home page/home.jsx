import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 text-gray-800 font-poppins">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">
          Welcome to the Ticket Reservation System
        </h1>
        <p className="text-gray-600 text-lg">
          Manage and reserve tickets effortlessly with our streamlined platform.
        </p>
        <div className="mt-8">
          <Link to="/configuration">
            <button className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
