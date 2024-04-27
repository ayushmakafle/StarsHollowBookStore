import React from "react";
import "../../assets/stylings/Footer.css";

const MainFooter = () => {
  return (
    <>
      <footer>
        <div className="links-container">
          <div className="links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/whyshophere">About us</a>
              </li>
              {/*   <li>
                                    <a href="#">Contact us</a>
                                </li> */}
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
            </ul>
          </div>
          <div className="links">
            <h3>Encyclopedia</h3>
            <ul>
              <li>
                <a href="/Login">Login</a>
              </li>

              <li>
                <a href="/ecommerce">Our Products</a>
              </li>
            </ul>
          </div>
          <div className="links">
            <h3>Contact Us</h3>
            <ul>
              <li>starshollow@gmail.com</li>
            </ul>
            {/* <form action="#">
                        <input type="text" placeholder="Email Address"/>
                        <button className="submit-btn">Subscribe</button>
                    </form> */}
          </div>
        </div>
        <p className="copyright text-center">© StarsHollow 2024</p>
      </footer>
    </>
  );
};

export default MainFooter;
