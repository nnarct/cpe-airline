import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <>

      <div className="bg-sky-950 py-10">
        <div className="container mx-auto xl:max-w-1000">
          <div className="flex text-white justify-between space-y-6 md:space-y-0 flex-wrap md:flex-nowrap">
            <div className="w-full px-4 min-w-fit w-full sm:w-1/2 md:w-full">
              <h3 className="text-xl">
                <span className="border-b border-orange-500 pb-1">About Us</span>
              </h3>
              <ul className="pt-4">
                <li className="whitespace-nowrap">Member of group</li>
                <li className="whitespace-nowrap">64070501007 Jakkrapan Patan</li>
                <li className="whitespace-nowrap">64070501018 Natcha Suha</li>
                <li className="whitespace-nowrap">64070501030 Parichat Sianin</li>
                <li className="whitespace-nowrap">64070501038 Pisit Thitiakarasak</li>
                <li className="whitespace-nowrap">64070501070 Nannapat Intharasing</li>
              </ul>
            </div>

            <div className="w-full px-4 min-w-fit w-full sm:w-1/2 md:w-full">
              <h3 className="text-xl">
                <span className="border-b border-orange-500 pb-1">Get Help</span>
              </h3>
              <ul className="pt-4">
                <li><a href="https://www.trip.com/pages/support/" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out" rel="noreferrer">FAQ</a></li>
                <li><a href="https://www.traveloka.com/th-th/how-to/bookflight" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out" rel="noreferrer">How to book a flight</a></li>
                <li><a href="https://pages.trip.com/service-guideline/terms-th-th.html" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out" rel="noreferrer">Terms & Conditions</a></li>
                <li><a href="https://pages.trip.com/service-guideline/privacy-policy-th-th.html" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out" rel="noreferrer">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="w-full px-5 min-w-fit">
              <h3 className="text-xl">
                <span className="border-b border-orange-500 pb-1">Contact US</span>
              </h3>
              <div className="flex space-x-2 pt-4">
                <a href="https://www.facebook.com/" target="_blank" className="hover:text-gray-200 text-4xl" rel="noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/" target="_blank" className="hover:text-gray-200 text-4xl" rel="noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com/" target="_blank" className="hover:text-gray-200 text-4xl" rel="noreferrer">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-4">
        <p>&copy; 2023 CPE Flying.co</p>
      </div>
    </>
  );
};
