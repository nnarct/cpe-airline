import "./footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
        <div className="footer">
          <div className="containerz">
          <div className="row">

          <div className="col1">
              <h3>About Us</h3>
            <ul>
              <p> Member of group
                <br/>64070501007 Jakkrapan Patan
                <br/>64070501018 Natcha Suha
                <br/>64070501030 Parichat Sianin
                <br/>64070501038 Pisit Thitiakarasak
                <br/>64070501070 Nannapat Intharasing</p>
            </ul>
          </div>

          <div className="col">
              <h3>Get Help</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="https://www.traveloka.com/th-th/how-to/bookflight">How to book a flight</a></li>
                <li><a href="https://pages.trip.com/service-guideline/terms-th-th.html">Teams & Conditions</a></li>
                <li><a href="https://pages.trip.com/service-guideline/privacy-policy-th-th.html">Privacy Policy</a></li>
              </ul>
          </div>

          <div className="col">
            <h3>Contact Us</h3>
              <div className="Social-links">
            
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /> </a>
              <a href="#"><FaTwitter /> </a>
            
              </div>
          </div>
            </div>
          </div>
        </div>

        <div className="copyrightText">
          <p>Copyright © 2023 CPE Flying.co
          </p>
        </div>

    </>
  );
};
