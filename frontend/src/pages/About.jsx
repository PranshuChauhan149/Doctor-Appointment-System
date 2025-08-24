import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="flex flex-col items-center gap-10 mt-8 px-4 py-8">
      
      {/* Section Title */}
      <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl text-gray-600">
        ABOUT <span className="text-black">US</span>
      </h1>

      {/* Main About Section */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl items-center">
        
        {/* Image */}
        <div className="w-full md:w-1/3">
          <img
            className="w-full rounded-xl"
            src={assets.about_image}
            alt="About us"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-2/3 flex flex-col gap-4 text-gray-700 text-sm md:text-base">
          <p>
            Welcome to <span className="font-medium text-black">Prescripto</span>, your
            trusted partner in managing your healthcare needs conveniently and
            efficiently. At Prescripto, we understand the challenges individuals
            face when it comes to scheduling doctor appointments and managing
            their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <h3 className="font-bold text-black text-lg">Our Vision</h3>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Why <span className="text-blue-600">Choose Us</span></h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="border  min-w-[150px]  min-h-[250px] border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg text-gray-700 mb-2">EFFICIENCY</h3>
            <p className="text-sm text-gray-600">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg text-gray-700 mb-2">CONVENIENCE</h3>
            <p className="text-sm text-gray-600">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg text-gray-700 mb-2">PERSONALIZATION</h3>
            <p className="text-sm text-gray-600">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
