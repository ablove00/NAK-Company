/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainLayout from "../components/MainLayout";
import { useAuthStore } from "../stores/authStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


export function Dashboard() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    document.title = "NAK Company - " + t("dashbord");
  }, []);

  if (!user) return <p>بارگذاری اطلاعات کاربر...</p>;

  return (
    <MainLayout>
      <div css={containerStyle}>
        <h3 css={headerStyle}>{t("helloUser", { username: user.username })} 👋🏻</h3>
        <p css={paragraphStyle}>{t("happyHere")}</p>
        <p css={paragraphStyle}>
          {t("hopeDashboardUseful")}
        </p>
      </div>
    </MainLayout>
  );
}

const containerStyle = css`
  border-radius: 7px;
  opacity: 1;
  padding: 40px;
  margin: 70px 100px;
  box-sizing: border-box;
  background: #FFFFFF66;

`;

const headerStyle = css`
    font-family: Inter;
    font-weight: 700;
    font-style: Bold;
    font-size: 25px;
    leading-trim: NONE;
    line-height: 40px;
    letter-spacing: 0%;
    color: #000433;

`;

const paragraphStyle = css`
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    leading-trim: NONE;
    line-height: 40px;
    letter-spacing: 0%;
    color: #000433;

`;

