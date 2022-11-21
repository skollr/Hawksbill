import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { preventDrag } from "../../../helpers/helpers";
import { PropsInterface } from "../../../helpers/interfaces";

export const SocialNetwork: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="login__social-network">
      <a
        className="login__hyperlink"
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        onDragStart={preventDrag}
      >
        <FaFacebookF className="reusable__icon" />
      </a>
      <a
        className="login__hyperlink"
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        onDragStart={preventDrag}
      >
        <FaInstagram className="reusable__icon" />
      </a>
      <a
        className="login__hyperlink"
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        onDragStart={preventDrag}
      >
        <FaYoutube className="reusable__icon" />
      </a>
      <a
        className="login__hyperlink"
        href="https://www.twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        onDragStart={preventDrag}
      >
        <FaTwitter className="reusable__icon" />
      </a>
    </div>
  );
};
