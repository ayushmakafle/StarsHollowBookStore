import "../../assets/stylings/Footer.css";

import AnimocaLogo from "../../assets/images/logo.png";
import DiscordImg from "../../assets/images/discord.png";
import TwitterImg from "../../assets/images/twitter.png";
import InstaImg from "../../assets/images/instagram.png";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RuneFooter = () => {
  return (
    <>
      <div className="rune-footer flex justify-around items-center">
        <div className="side-a flex flex-col">
          <div className="logo flex flex-row">
            <a href="https://www.animocabrands.com/" target="_blank">
              <img src={AnimocaLogo} className="w-32 h-auto" />
            </a>
            <a href="https://www.towerecosystem.com/" target="_blank">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="ml-12 w-12 h-auto mt-10"
              />
            </a>
          </div>
          <div className="text flex flex-row mt-10 mb-10">
            <a
              href="https://lightpaper.crazydefenseheroes.com/"
              target="_blank"
            >
              <p className="ml-3 mr-4">PRIVACY POLICY</p>
            </a>
            <a
              href="https://crazydefenseheroes.com/privacy-policy"
              target="_blank"
            >
              <p className="mr-3 ml-6">OUR STORE</p>
            </a>
            <a href="mailto:tower-token@animocabrands.com">
              <p className="mx-3">CONTACT US</p>
            </a>
          </div>
        </div>
        <div className="side-b flex flex-col">
          <div className="top font-bold text-lg md:mb-4 mb-0">
            <p>Follow Us</p>
          </div>
          <div className="side-b">
            <a href="https://medium.com/tower-token" target="_blank">
              <img src={InstaImg} />
            </a>
            <a href="https://discord.com/invite/towerfranchise" target="_blank">
              <img src={DiscordImg} />
            </a>

            <a href="https://t.me/TowerToken" target="_blank">
              <img src={TwitterImg} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RuneFooter;
