/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainLayout from "../components/MainLayout";
import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function Attributes() {
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "NAK Company - " + t("attributes");
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await api.get("/attributes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttributes(res.data || []);
      } catch (error: any){
        const serverMessage = error?.response?.data?.message;

        if (serverMessage) {
            toast.error(serverMessage);
        } else {
            toast.error(t("generic_error"));
        }

        setAttributes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (!token) return <p>{t("loadingUser")}</p>;

  return (
    <MainLayout>
      <div css={containerStyle}>
        <div css={headerRowStyle}>
          <h1 css={titleStyle}>{t("attributes")}</h1>
          <Link to="/attributes/add" css={addButtonStyle}>
            {t("add_attribute")}
          </Link>
        </div>

        <table css={tableStyle}>
          <thead>
            <tr>
              <th></th>
              <th>{t("name")}</th>
              <th>{t("values")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} css={loadingCell}>
                 
                </td>
              </tr>
            ) : attributes.length > 0 ? (
              attributes.map((attr, index) => (
                <tr key={attr._id}>
                  <td>{index + 1}</td>
                  <td>{attr.name}</td>
                  <td>{attr.values.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} css={noDataCell}>
                   {t("no_data_found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  padding: 20px;
`;

const headerRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
`;

const addButtonStyle = css`
  width: 205px;
  height: 40px;
  border-radius: 10000px;
  border: 1px solid #000000;
  background: #000000;
  color: #ffffff;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
    border: 1px solid #000; 
  }
`;

const tableStyle = css`
  width: 100%;
  margin-top: 40px;
  border-collapse: collapse;
  font-family: Inter;
  background: #ffffff66;
  border-radius: 40px;
  overflow: hidden;

  thead {
    background: #00000005;
  }

  th,
  td {
    border: 1px solid #ffffff;
    padding: 15px;
    text-align: center;
    font-family: Inter;
    font-weight: 700;
    font-style: Bold;
    font-size: 25px;
    leading-trim: NONE;
    line-height: 40px;
    letter-spacing: 0%;
  }

  td {
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
  }

  th:first-of-type {
    width: 60px;
    text-align: center;
  }

  td:first-of-type {
    text-align: center;
  }

  tbody tr:last-of-type td {
    border-bottom: none;
  }
`;

const loadingCell = css`
  text-align: center;
  padding: 15px;
  font-style: italic;
  color: #444;
`;

const noDataCell = css`
  text-align: center;
  padding: 15px;
  font-style: italic;
  color: #999;
`;
