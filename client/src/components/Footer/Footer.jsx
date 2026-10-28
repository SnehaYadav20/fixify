import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="foot-panel1">
        <a href="#">Back to Top</a>
      </div>

      <div className="foot-panel2">
        
        <ul>
        <h2>COMPANY</h2>
          <li><a href="#">Terms & conditions </a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Testimonials</a></li>
        </ul>
        
        <ul>
        <h2>FIND US HERE</h2>
        <li><i class="fa-brands fa-facebook"></i><a href="#">Facebook</a></li>
        <li><i class="fa-brands fa-instagram"></i><a href="#">Instagram</a></li>
        <li><i class="fa-brands fa-twitter"></i><a href="#">Twitter</a></li>
        <li><i class="fa-brands fa-linkedin"></i><a href="#">LinkedIn</a></li>
        </ul>
      </div>


        <div className="copyright">
        Copyright © 2024 FIXFY. All rights reserved
        </div>

    </footer>
  );
}

export default Footer;
