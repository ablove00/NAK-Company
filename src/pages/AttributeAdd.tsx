/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import api from "../api/axios";
import MainLayout from "../components/MainLayout";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

type AttributeFormData = {
  name: string;
  values: { value: string }[];
};

// ---------------------- CSS Styles ----------------------
const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  padding: 20px;
`;

const titleStyle = css`
  margin-bottom: 20px;
  font-family: Inter;
  font-weight: 800;
  font-style: Extra Bold;
  font-size: 30px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: 0%;
  margin-bottom: 75px;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const inputRowStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-grow: 1;
  align-items: flex-start;

  & > div:nth-of-type(1) {
    flex: 1; /* name */
  }
  & > div:nth-of-type(2) {
    flex: 2; /* values */
  }
  & > div:nth-of-type(3) {
    flex: 0 0 60px; /* button column fixed width */
  }
`;

const colStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  min-width: 400px;
  max-width: 400px;
  margin: 0 20px 20px 0;

  &:last-child {
    min-width: 200px;
  }
`;

const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const labelStyle = (lang: string = "en") => css`
  position: absolute;
  top: -15px;
  ${lang === "fa" ? "right" : "left"}: 70px;
  background: linear-gradient(167.98deg, #f4f4f4 0%, #f6f6f6 100%);;
  padding: 0 20px;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
`;

const textInputStyle = css`
  height: 70px;
  border-radius: 40px;
  border: 1px solid #00000066;
  background: #ffffff66;
  padding: 0 15px;
  font-size: 20px;
`;

const circleButtonStyle = (marginTop: number) => css`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #000;
    background: #00000005;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: ${marginTop}px;

    &:hover {
      background: #000;
      color: white;
      border: 1px solid #000; 
      
      svg path{
        fill:#fff
      }
    }
  `;

const actionRowStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
`;

const cancelButtonStyle = css`
  width: 200px;
  height: 70px;
  border-radius: 10000px;
  border: 1px solid #000;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  background: white;
  color: #000;
  cursor: pointer;
  leading-trim: NONE;
  line-height: 40px;
  letter-spacing: 0%;
  transition: background 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;


  &:hover {
    background: #000;
    color: white;
    border: 1px solid #000; 
  }
`;

const saveButtonStyle = css`
  width: 200px;
  height: 70px;
  border-radius: 10000px;
  border: 1px solid #000;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  background: #000;
  color: #fff;
  cursor: pointer;
  leading-trim: NONE;
  line-height: 40px;
  letter-spacing: 0%;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: transparent;
    color: #000;
    border: 1px solid #000; 
  }
`;

// ---------------------- Component ----------------------
export function AttributeAdd() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NAK Company - Add " + t("attributes");
  }, []);

  const { control, register, handleSubmit } = useForm<AttributeFormData>({
    defaultValues: {
      name: "",
      values: [{ value: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "values",
  });

  const [clickCount, setClickCount] = useState(0);

  const onSubmit: SubmitHandler<AttributeFormData> = async (data) => {
    try{
      const payload = {
        name: data.name,
        values: data.values.map((v) => v.value),
      };   
      await api.post("/attributes", payload);
      toast.success(t("save_success"));
      navigate("/attributes");
    } catch (error: any){
      const serverMessage = error?.response?.data?.message;

      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        toast.error(t("generic_error"));
      }
    }
  };

  return (
    <MainLayout>
      <div css={containerStyle}>
        <h1 css={titleStyle}>{t("attributes")}</h1>

        <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1 */}
          <div css={inputRowStyle}>
            <div css={colStyle}>
              <div css={inputGroupStyle}>
                <label css={labelStyle(i18n.language)}>{t("name")}</label>
                <input
                  {...register("name")}
                  placeholder={t("name")}
                  css={textInputStyle}
                />
              </div>              
            </div>

            <div css={colStyle}>
              {fields.map((field, index) => (
                <div css={inputGroupStyle}>
                  <label css={labelStyle(i18n.language)}>{t("value")}</label>
                  <input
                    key={field.id}
                    {...register(`values.${index}.value`)}
                    placeholder={t("value")}
                    css={textInputStyle}
                  />
                </div>
              ))}
            </div>

            <div css={colStyle}>
              <button
                type="button"
                onClick={() => {
                  append({ value: "" });
                  setClickCount((prev) => prev + 1);
                }}
                css={circleButtonStyle(clickCount * 102)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0001 20C9.2001 20 8.57153 19.3714 8.57153 18.5714V1.42857C8.57153 0.628571 9.2001 0 10.0001 0C10.8001 0 11.4287 0.628571 11.4287 1.42857V18.5714C11.4287 19.3714 10.8001 20 10.0001 20Z" fill="black"/>
                  <path d="M18.5714 11.4287H1.42857C0.628571 11.4287 0 10.8001 0 10.0001C0 9.2001 0.628571 8.57153 1.42857 8.57153H18.5714C19.3714 8.57153 20 9.2001 20 10.0001C20 10.8001 19.3714 11.4287 18.5714 11.4287Z" fill="black"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Row 2 */}
          <div css={actionRowStyle}>
            <Link to="/attributes" css={cancelButtonStyle}>
              {t("cancel")}
            </Link>
            <button type="submit" css={saveButtonStyle}>
               {t("save")}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
