import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
      <div className="bg-sky-950 py-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4">
              <h3 className="text-white text-xl font-medium mb-4">About Us</h3>
              <ul className="text-white">
                <li>Member of group</li>
                <li>64070501007 Jakkrapan Patan</li>
                <li>64070501018 Natcha Suha</li>
                <li>64070501030 Parichat Sianin</li>
                <li>64070501038 Pisit Thitiakarasak</li>
                <li>64070501070 Nannapat Intharasing</li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/3 px-4">
              <h3 className="text-white text-xl  font-medium mb-4">Get Help</h3>
              <ul className="text-white">
                <li><a href="https://www.trip.com/pages/support/" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out">FAQ</a></li>
                <li><a href="https://www.traveloka.com/th-th/how-to/bookflight" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out">How to book a flight</a></li>
                <li><a href="https://pages.trip.com/service-guideline/terms-th-th.html" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out">Terms & Conditions</a></li>
                <li><a href="https://pages.trip.com/service-guideline/privacy-policy-th-th.html" target="_blank" className="hover:text-gray-200 hover:ml-3 transition-all duration-500 ease-in-out">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/3 px-4">
              <h3 className="text-white text-xl  font-medium mb-4">Contact Us</h3>
              <div className="flex">
                <a href="https://www.facebook.com/" target="_blank" className="text-white hover:text-gray-200 mr-2 text-4xl">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/" target="_blank" className="text-white hover:text-gray-200 mr-2 text-4xl">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com/" target="_blank" className="text-white hover:text-gray-200 text-4xl">
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
