import { useEffect, useRef } from "react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  AdminPaths,
  APIPaths,
  PropsInterface,
} from "../../../helpers/interfaces";
import { useAuth } from "../../../hooks/useAuth";
import { HorizontalLogo } from "./HorizontalLogo";

export const Header: React.FC<PropsInterface> = (): JSX.Element => {
  const { auth } = useAuth();
  const profileImageUrl: string = `${APIPaths.MEDIA_URL}/${auth?.profile_image}`;
  const useProfileImage: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  useEffect((): void => {
    if (useProfileImage.current !== null) {
      useProfileImage.current.style.background = `url('${profileImageUrl}')`;
      useProfileImage.current.style.backgroundSize = "cover";
      useProfileImage.current.style.backgroundRepeat = "no-repeat";
    }
  }, [profileImageUrl]);
  return (
    <div className="header">
      <div className="header__toggle-button-silhouette" />
      <HorizontalLogo />
      <div className="header__right-side">
        <div className="header__chat-icon">
          <BsFillChatLeftDotsFill className="reusable__icon" />
        </div>
        <div className="header__profile">
          <div className="header__profile-detail">
            <span className="header__profile-username">{auth?.user}</span>
            <span className="header__profile-position">{auth?.position}</span>
          </div>
          <Link to={AdminPaths.Settings}>
            <div ref={useProfileImage} className="header__profile-image" />
          </Link>
        </div>
      </div>
    </div>
  );
};
