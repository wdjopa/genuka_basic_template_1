import React from "react";

function Modal({ children, title, isOpen = false, setIsOpen }) {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center ">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl md:max-w-4xl xl:max-w-5xl sm:w-full px-6 py-4">
            <div className="">
              <div className="flex items-center justify-between mb-2 border-b pb-4">
                <h2 className="text-xl sm:text-3xl leading-6 font-sm text-gray-900">
                  {title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-xl sm:text-3xl leading-none font-semibold text-black hover:text-black focus:outline-none focus:text-black"
                >
                  ×
                </button>
              </div>
              <div className="mt-2 overflow-auto sm:h-auto px-2">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
