import React from 'react';
import { CENTER_INFO } from '../data/content';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={CENTER_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Grow Well on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 focus:outline-none"
    >
      <span className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-[#1E2E3B] text-white text-xs font-semibold shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200 whitespace-nowrap">
        Chat with us on WhatsApp
      </span>

      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1FB858] text-white shadow-[0_10px_28px_rgba(37,211,102,0.42)] hover:shadow-[0_14px_34px_rgba(37,211,102,0.55)] transition-all duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <path d="M16.002 3C8.832 3 3 8.832 3 16c0 2.29.598 4.525 1.734 6.494L3 29l6.678-1.752A12.93 12.93 0 0 0 16.002 29C23.17 29 29 23.168 29 16S23.17 3 16.002 3zm0 23.62c-2.065 0-4.087-.556-5.845-1.608l-.42-.25-3.963 1.04 1.058-3.862-.274-.436A10.576 10.576 0 0 1 5.38 16c0-5.857 4.765-10.62 10.622-10.62 2.838 0 5.505 1.106 7.51 3.112a10.555 10.555 0 0 1 3.11 7.508c0 5.856-4.765 10.62-10.62 10.62zm5.825-7.953c-.32-.16-1.89-.933-2.183-1.04-.293-.107-.506-.16-.72.16-.212.32-.825 1.04-1.012 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.588-.95-.847-1.592-1.893-1.778-2.213-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.106-.214.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55h-.613c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.306.16.214 2.256 3.445 5.466 4.83.763.33 1.36.526 1.825.674.766.244 1.464.21 2.016.127.615-.092 1.89-.773 2.156-1.52.266-.746.266-1.386.186-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </span>
    </a>
  );
};
