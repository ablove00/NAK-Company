import { jwtDecode } from "jwt-decode";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import type { UserPayload } from "../../types";
import { useTranslation } from "react-i18next";

interface SignInFormInputs {
  userName: string;
  password: string;
}

export function SignIn() {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormInputs>();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const res = await api.post("/auth/login", data);
      const token = res.data.access_token;
      setToken(token);

      const decoded = jwtDecode<UserPayload>(token);
      // setUser({
      //   ...decoded,
      //   exp: decoded.iat + 60 * 10 // 10 دقیقه
      // });
      setUser(decoded);

      toast.success(t("login_success"));
      navigate("/");
    } catch (error: any){
      const serverMessage = error?.response?.data?.message;

      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        toast.error(t("login_error"));
      }
    }
  };

  return (
    <div css={container}>
      <form css={formBox} onSubmit={handleSubmit(onSubmit)}>
        <h1 css={title}>{t("sign_in")}</h1>

        <input
          css={input}
          type="text"
          placeholder={t("username")}
          {...register("userName", { required: t("username_required") })}
        />
        {errors.userName && <span css={errorText}>{errors.userName.message}</span>}

        <input
          css={input}
          type="password"
          placeholder={t("password")}
          {...register("password", { required: t("password_required")})}
        />
        {errors.password && <span css={errorText}>{errors.password.message}</span>}

        <div css={buttonsRow}>
          <Link to="/signup" css={signUpBtn}>{t("sign_up")}</Link>

          <button type="submit" css={signInBtn(i18n.language)} disabled={isSubmitting}>
            {isSubmitting ? t("login") + "..." : (
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.2929L15.3431 0.928933C14.9526 0.538409 14.3195 0.538409 13.9289 0.928933C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 8L1 9L21 9L21 8L21 7L1 7L1 8Z"
                    fill="currentColor"
                  />
                </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const formBox = css`
  width: 700px;
  background: #ffffff66;
  border-radius: 40px;
  border: 1px solid #ffffff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const title = css`
  font-family: Inter, sans-serif;
  font-weight: 800;
  font-size: 30px;
  color: #000;
  margin-bottom: 40px;
`;

const input = css`
  height: 70px;
  border-radius: 40px;
  background: #00000005;
  border: none;
  padding: 0 20px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 20px;
  outline: none;

  &::placeholder {
    color: #555;
  }
`;

const errorText = css`
  font-size: 14px;
  color: red;
  margin-top: -10px;
  margin-bottom: 5px;
`;

const buttonsRow = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const signUpBtn = css`
  width: 116px;
  height: 40px;
  border-radius: 10000px;
  border: 1px solid #000;
  background: transparent;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  cursor: pointer;
  color: #000;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #000;
    color: white;
    border: 1px solid #000; 
  }
`;

const signInBtn = (lang: string = "en") => css`
  width: 116px;
  height: 40px;
  border-radius: 10000px;
  background: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, color 0.3s ease;
  border: 1px solid #000;  
  color:#fff;

  &:hover {
    background: transparent;
    color: #000;
    border: 1px solid #000; 
  }

  svg {
    transform: ${lang === "fa" ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;

