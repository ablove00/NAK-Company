/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import MyNavLink from "./MyNavLink";
import { useTranslation } from "react-i18next";


const containerStyle = css`
  display: flex;
  min-height: 100vh;
  font-family: Tahoma, sans-serif;
  font-size: 14px;
  color: #04131c;
`;

const sidebarStyle =  (lang: string = "en") => css`
  width: 300px;
  border-${lang === "fa" ? "left" : "right"}: 1px solid #FFFFFF;
  border-top-${lang === "fa" ? "left" : "right"}-radius: 40px;
  border-bottom-${lang === "fa" ? "left" : "right"}-radius: 40px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF66;
  position: fixed;
  bottom: 0;
  top: 0;
`;

const avatarWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  margin-top: 100px;
  cursor: pointer;
  flex-direction: column;
`;

const avatarStyle = css`
  background-color: #fff;
  width: 70px;
  height: 70px;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const userNameStyle = css`
  font-family: Inter;
  font-weight: 600;
  font-style: Semi Bold;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 40px;
  letter-spacing: 0%;
  color:#000
`;

const menuStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  margin-top: 70px;
`;

const menuItemStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 40px;
  color: #000;
  opacity: 0.4;
  text-decoration: none;
  transition: all 0.3s ease;
  height:70px;
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 15px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: 0%;

  &:hover {
    opacity: 1;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    color: #000;
    background: #00000005;

    svg, g {
      opacity: 1 !important; 
      transition: opacity 0.3s ease;
    }
    
    svg path{
      fill:black
    }
  }
`;

const menuItemActiveStyle = css`
    opacity: 1;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    color: #000;
    background: #00000005;

    svg, g {
      opacity: 1 !important; 
      transition: opacity 0.3s ease;
    }
    
    svg path{
      fill:black
    }
`;

const logoutButtonStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 40px;
  color: #000;
  opacity: 0.4;
  text-decoration: none;
  transition: all 0.3s ease;
  height:70px;
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 15px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: 0%;
  margin-bottom: 100px;
  border:0;
  cursor: pointer;

  &:hover {
    opacity: 1;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    color: #000;
    background: #00000005;
    border:0;

    svg, g {
      opacity: 1 !important; 
      transition: opacity 0.3s ease;
    }
    
    svg path{
      fill:black
    }
  }
`;

const langButtonStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 40px;
  color: #000;
  opacity: 0.4;
  text-decoration: none;
  transition: all 0.3s ease;
  height:70px;
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 15px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: 0%;
  margin-bottom: 0px;
  border:0;
  cursor: pointer;

  &:hover {
    opacity: 1;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    color: #000;
    background: #00000005;
    border:0;
  }

`;

const mainContentStyle = (lang: string = "en") => css`
  flex-grow: 1;
  padding: 20px;
  margin-${lang === "fa" ? "right" : "left"}: 300px;
`;

const linkSpan = (lang: string = "en") => css`
  margin-${lang === "fa" ? "right" : "left"}: 6px;
`;

function MainLayout({ children}) {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);
  if (!user) return <p>{t("loadingUser")}</p>;

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);

    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "fa" ? "rtl" : "ltr";
  };

  return (
    <div css={containerStyle}>
      <aside css={sidebarStyle(i18n.language)}>
        <div
          css={avatarWrapperStyle}
          onClick={() => navigate("/dashboard")}
          title={t("go_to_dashboard")}
        >
          <div css={avatarStyle}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 20C22.3206 20 24.5462 19.0781 26.1872 17.4372C27.8281 15.7962 28.75 13.5706 28.75 11.25C28.75 8.92936 27.8281 6.70376 26.1872 5.06282C24.5462 3.42187 22.3206 2.5 20 2.5C17.6794 2.5 15.4538 3.42187 13.8128 5.06282C12.1719 6.70376 11.25 8.92936 11.25 11.25C11.25 13.5706 12.1719 15.7962 13.8128 17.4372C15.4538 19.0781 17.6794 20 20 20ZM9.375 22.5C8.21468 22.5 7.10188 22.9609 6.28141 23.7814C5.46094 24.6019 5 25.7147 5 26.875V27.5C5 30.4912 6.90375 33.0212 9.60625 34.7412C12.3238 36.4712 16.0025 37.5 20 37.5C23.9975 37.5 27.675 36.4712 30.3938 34.7412C33.0963 33.0212 35 30.4912 35 27.5V26.875C35 25.7147 34.5391 24.6019 33.7186 23.7814C32.8981 22.9609 31.7853 22.5 30.625 22.5H9.375Z"
                fill="#04131C"
              />
            </svg>
          </div>
          <div css={userNameStyle}>{user.username}</div>
        </div>

        <nav css={menuStyle}>
        <MyNavLink
            to="/attributes"
            menuItemStyle={menuItemStyle}
            menuItemActiveStyle={menuItemActiveStyle}
          >
          <IconAttribute />
          <span css={linkSpan(i18n.language)}>{t("attributes")}</span>
        </MyNavLink>

        <MyNavLink
          to="/products"
          menuItemStyle={menuItemStyle}
          menuItemActiveStyle={menuItemActiveStyle}
        >
          <IconProduct/>
          <span css={linkSpan(i18n.language)}>{t("products")}</span>
        </MyNavLink>
        </nav>

        <a
          css={langButtonStyle}
          onClick={toggleLanguage}
        >          
          <span css={linkSpan(i18n.language)}>{t("lang")}</span>
        </a>
        <a
          css={logoutButtonStyle}
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span css={linkSpan(i18n.language)}>{t("logout")}</span>
        </a>
      </aside>

      <main css={mainContentStyle(i18n.language)}>{children}</main>
    </div>
  );
}

const IconAttribute = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  <g opacity="0.4">
    <path d="M16.6176 0.5C17.1568 0.5 17.4889 0.963195 17.6586 1.35059C17.8477 1.78225 17.9418 2.33261 17.9418 2.88086C17.9418 3.42926 17.8478 3.98038 17.6586 4.41211C17.4889 4.79943 17.1566 5.26172 16.6176 5.26172H5.38227C4.84328 5.26172 4.511 4.79943 4.34126 4.41211C4.15213 3.98038 4.05805 3.42926 4.05805 2.88086C4.05807 2.33263 4.15223 1.78224 4.34126 1.35059C4.51095 0.963194 4.84313 0.5 5.38227 0.5H16.6176Z" stroke="black"/>
    <path d="M20.1758 8.61902C20.7149 8.61902 21.0471 9.08221 21.2168 9.4696C21.4058 9.90126 21.5 10.4516 21.5 10.9999C21.5 11.5483 21.4059 12.0994 21.2168 12.5311C21.0471 12.9185 20.7148 13.3807 20.1758 13.3807H1.82422C1.28523 13.3807 0.952943 12.9185 0.783203 12.5311C0.594081 12.0994 0.5 11.5483 0.5 10.9999C0.500014 10.4516 0.59418 9.90126 0.783203 9.4696C0.952902 9.08221 1.28508 8.61902 1.82422 8.61902H20.1758Z" stroke="black"/>
    <path d="M16.1534 16.738C16.4214 16.738 16.646 16.8608 16.8126 17.0183C16.976 17.1729 17.1008 17.3748 17.1944 17.5886C17.2894 17.8056 17.3604 18.0518 17.4073 18.3103C17.4543 18.5696 17.4776 18.8441 17.4776 19.1189C17.4776 19.3939 17.4544 19.669 17.4073 19.9285C17.3604 20.187 17.2895 20.4332 17.1944 20.6501C17.1007 20.8639 16.9761 21.0659 16.8126 21.2205C16.646 21.3779 16.4214 21.4998 16.1534 21.4998H5.84677C5.57881 21.4998 5.35414 21.3779 5.18759 21.2205C5.02413 21.0659 4.89944 20.8639 4.80576 20.6501C4.71072 20.4332 4.63979 20.187 4.59286 19.9285C4.54578 19.669 4.52255 19.3939 4.52255 19.1189C4.52256 18.8441 4.54584 18.5696 4.59286 18.3103C4.63977 18.0518 4.71075 17.8056 4.80576 17.5886C4.89941 17.3748 5.02417 17.1729 5.18759 17.0183C5.35415 16.8608 5.57874 16.738 5.84677 16.738H16.1534Z" stroke="black"/>
  </g>
  </svg>
);

const IconProduct = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.4">
      <path d="M9.35449 11.7275C9.86136 11.7275 10.2725 12.1386 10.2725 12.6455V20.582C10.2725 21.0889 9.86136 21.5 9.35449 21.5H1.41797C0.911103 21.5 0.5 21.0889 0.5 20.582V12.6455C0.5 12.1386 0.9111 11.7275 1.41797 11.7275H9.35449ZM15.2764 0.706055C15.6129 0.431248 16.099 0.431337 16.4355 0.706055L16.5049 0.768555L21.2314 5.49512C21.5897 5.85351 21.5897 6.43462 21.2314 6.79297L16.5049 11.5195C16.4101 11.6142 16.2993 11.6829 16.1816 11.7275H19.7988C20.3055 11.7277 20.7158 12.1388 20.7158 12.6455V20.582C20.7158 21.0888 20.3055 21.4998 19.7988 21.5H11.8613C11.3545 21.5 10.9434 21.0889 10.9434 20.582V12.6455C10.9434 12.1386 11.3545 11.7276 11.8613 11.7275H15.5303C15.4126 11.6829 15.3018 11.6142 15.207 11.5195L10.4805 6.79297C10.3855 6.69798 10.3171 6.58671 10.2725 6.46875V10.1387C10.2724 10.6455 9.86135 11.0566 9.35449 11.0566H1.41797C0.911107 11.0566 0.500011 10.6455 0.5 10.1387V2.20117C0.500183 1.69446 0.911214 1.28418 1.41797 1.28418H9.35449C9.86125 1.28418 10.2723 1.69446 10.2725 2.20117V5.81836C10.3171 5.70069 10.3858 5.5899 10.4805 5.49512L15.207 0.768555L15.2764 0.706055Z" stroke="black"/>
    </g>
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="black"
    strokeOpacity="0.4"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default MainLayout;
