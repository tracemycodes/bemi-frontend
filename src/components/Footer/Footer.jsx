import {
  FaAngleDown,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isActive, setIsActive] = useState(0);
  const [state, setState] = useState(true);

  const setClick = (num) => {
    if (isActive === num) {
      setIsActive(0);
    } else {
      setIsActive(num);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setState(true);
      } else {
        setState(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  return (
    <footer className="bg-black px-5 md:px-20 pt-10 pb-10">
      <section className="w-full border-2 border-red-900 grid lg:grid-cols-4 md:grid-cols-2 md:gap-y-4">
        {/* service and security */}
        <section className="p-2.5 text-white w-full text-xs">
          <div
            className="mb-4 flex justify-between items-center "
            onClick={() => setClick(1)}
          >
            <h3 className="text-sm text-darkgray">SERVICE & SECURITY</h3>
            <FaAngleDown
              className="md:hidden"
              style={{
                transform: isActive === 1 ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </div>
          {(isActive === 1 || state) && (
            <div className="grid-cols-1 text-sm grid gap-3">
              <a href="https://www.github.com" rel="noreferrer">
                Bemi Ivory Privacy Policy
              </a>
              <a href="https://www.github.com" rel="noreferrer">
                Bemi Ivory Cookies Policy
              </a>
              <a href="https://www.github.com" rel="noreferrer">
                Payment Methods
              </a>
              <a href="https://www.github.com" rel="noreferrer">
                Returns And Refunds
              </a>
              <a href="https://www.github.com" rel="noreferrer">
                Shipping & Delivery
              </a>
              <a href="https://www.github.com" rel="noreferrer">
                Terms Of Service
              </a>
            </div>
          )}
        </section>

        {/* Shop */}
        <section className="p-2.5 text-white w-full text-xs">
          <div
            className="mb-4 flex justify-between items-center"
            onClick={() => setClick(2)}
          >
            <h3 className="text-sm text-darkgray">SHOP</h3>
            <FaAngleDown
              className="md:hidden"
              style={{
                transform: isActive === 2 ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </div>
          {(isActive === 2 || state) && (
            <div className="grid-cols-1 text-sm grid md:grid gap-3">
              <a href="https://www.google.com" rel="noreferrer">
                Dresses
              </a>
              <a href="https://www.google.com" rel="noreferrer">
                Knitwear
              </a>
              <a href="https://www.google.com" rel="noreferrer">
                Top & T-Shirts
              </a>
            </div>
          )}
        </section>

        {/* About us */}
        <section className="p-2.5 text-white w-full text-xs">
          <div
            className="mb-4 flex justify-between items-center"
            onClick={() => setClick(3)}
          >
            <h3 className="text-sm text-darkgray">ABOUT US</h3>
            <FaAngleDown
              className="md:hidden"
              style={{
                transform: isActive === 3 ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </div>
          {(isActive === 3 || state) && (
            <div className="grid-cols-1 text-sm grid md:grid gap-3">
              <a href="htpps://www.google.com">Call Us</a>
              <a href="htpps://www.google.com">Email Us</a>
            </div>
          )}
        </section>

        {/* Join Needle & Thread */}
        <section className="p-2.5 text-white w-full text-xs">
          <div className="mb-4">
            <h3 className="text-sm text-darkgray">JOIN BEMI IVORY</h3>
          </div>
          <form className="flex mb-2.5">
            <input
              type="email"
              className="p-2 focus:outline-none focus:border-2 bg-inherit border-2 border-white w-3/4"
            />
            <button className="w-1/4 border-2 border-white bg-white text-black text-xs">
              subscribe
            </button>
          </form>
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms" className="pl-2.5 text-xs">
            By signing up you agree to receive marketing material from Bemi
            Ivory
          </label>
          <div className="md:mt-2.5 mt-10 ">
            <h3 className="text-sm">Follow Us On</h3>
          </div>
          <div className="w-52 mt-2.5 flex justify-between">
            <a href="https://www.facebook.com">
              <FaFacebook className="text-lg hover:text-darkgray" />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram className="text-lg hover:text-darkgray" />
            </a>
            <a href="https://www.linkedin.com">
              <FaLinkedin className="text-lg hover:text-darkgray" />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter className="text-lg hover:text-darkgray" />
            </a>
          </div>
        </section>
      </section>

      <section className="py-2 mt-10">
        <p className="text-xs text-white">Copyright &copy; 2022 BEMI IVORY</p>
      </section>
    </footer>
  );
};

export default Footer;
