import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className='flex flex-col items-center gap-10 mt-8 px-4 py-10 max-w-5xl mx-auto'>
      
      {/* Section Title */}
      <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl text-gray-600">
        CONTACT <span className="text-black">US</span>
      </h1>

      {/* Image */}
      <div className='w-full md:w-2/3'>
        <img src={assets.contact_image} alt="Contact" className='w-full rounded-lg' />
      </div>

      {/* Contact Details */}
      <div className='w-full md:w-2/3 flex flex-col gap-6 text-gray-700 text-sm md:text-base'>

        {/* Office Info */}
        <div>
          <h2 className='font-semibold text-lg mb-1'>OUR OFFICE</h2>
          <p>00000 Willms Station</p>
          <p>Suite 000, Washington, USA</p>
          <p className='mt-2'>Tel: (000) 000-0000</p>
          <p>Email: pranshuchauhan@gmail.com</p>
        </div>

        {/* Careers Info */}
        <div>
          <h2 className='font-semibold text-lg mb-1'>CAREERS AT PRESCRIPTO</h2>
          <p>Learn more about our teams and job openings.</p>
          <button className='mt-3 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
