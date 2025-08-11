// components/ConfirmModal.tsx
import React from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { i18n } = useTranslation();
  return (
    <div css={overlayStyle}>
      <div css={modalStyle}>
        <span css={messageStyle(i18n.language)}>{message}</span>
        <button css={noBtnStyle} onClick={onCancel}>
          No
        </button>
        <button css={yesBtnStyle} onClick={onConfirm}>
          Yes
        </button>
      </div>
    </div>
  );
};

const overlayStyle = css`
  position: fixed;
  backdrop-filter: blur(14px);
  background: #00000005;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalStyle = css`
  width: 400px;
  border-radius: 40px;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const messageStyle = (lang: string = "en") => css`
  width: 100%;
  height: 80px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  color: #000000;
  text-align: ${lang === "fa" ? "right" : "left"};
  margin-bottom: 50px;
`;

const noBtnStyle = css`
  width: 100%;
  height: 50px;
  border-radius: 10000px;
  border: 1px solid #000000;
  background: #ffffff;
  font-weight: 600;
  font-size: 20px;
  color: #000000;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #000000;
    color: #ffffff;
    border: 1px solid #000000; 
  }
`;

const yesBtnStyle = css`
  width: 100%;
  height: 50px;
  border-radius: 10000px;
  border: 1px solid #c50000;
  background: #c50000;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #fff;
    color: #c50000;
    border: 1px solid #c50000; 
  }
`;
