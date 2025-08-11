/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainLayout from "../components/MainLayout";
import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useConfirm } from "../hooks/useConfirm";


export function Products() {
  const { t } = useTranslation();
  const confirm = useConfirm();
  const token = useAuthStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "NAK Company - " + t("products");
  }, []);
  
  const fetchProducts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/products?perPage=10&page=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data?.items || []);
    } catch (error: any) {
      const serverMessage = error?.response?.data?.message;
      toast.error(serverMessage || t("products_fetch_error"));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleDelete = async (id: string, name: string) => {
    const result = await confirm(t("confirm_delete_product", { name }));
    if (!result) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t("product_deleted_success"));
      fetchProducts();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t("product_delete_failed"));
    }
  };

  if (!token) return <p>{t("loadingUser")}</p>;

  return (
    <MainLayout>
      <div css={containerStyle}>
        <div css={headerRowStyle}>
          <h1 css={titleStyle}>{t("products")}</h1>
          <Link to="/products/add" css={addButtonStyle}>
            {t("add_product")}
          </Link>
        </div>

        <table css={tableStyle}>
          <thead>
            <tr>
              <th></th>
              <th css={nameColumn}>{t("name")}</th>
              <th>{t("count_of_skus")}</th>
              <th css={operationColumn}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} css={loadingCell}>
                  {t("loading_data")}
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product: any, index: number) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.skus.length}</td>
                  <td>
                    <button
                      css={iconButtonDelete}
                      onClick={() =>
                        handleDelete(product._id, product.name)
                      }
                      title={t("delete")}
                    >
                      {/* SVG Delete */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.4">
                            <path d="M18.89 4C19.1732 4.00028 19.4456 4.09788 19.6516 4.27285C19.8575 4.44782 19.9815 4.68695 19.9981 4.94139C20.0147 5.19584 19.9227 5.44638 19.7409 5.64183C19.5591 5.83729 19.3013 5.9629 19.02 5.993L18.89 6H18.8L17.7787 17C17.7788 17.7652 17.4539 18.5015 16.8705 19.0583C16.2872 19.615 15.4894 19.9501 14.6406 19.995L14.445 20H5.55501C3.77923 20 2.32794 18.751 2.23015 17.25L2.2246 17.083L1.19892 6H1.11002C0.826782 5.99972 0.554357 5.90212 0.348403 5.72715C0.142448 5.55218 0.0185102 5.31305 0.00191139 5.05861C-0.0146875 4.80416 0.0773059 4.55362 0.259095 4.35817C0.440885 4.16271 0.698749 4.0371 0.980001 4.007L1.11002 4H18.89ZM12.2225 0C12.8119 0 13.3772 0.210714 13.794 0.585786C14.2108 0.960859 14.445 1.46957 14.445 2C14.4447 2.25488 14.3362 2.50003 14.1418 2.68537C13.9474 2.8707 13.6816 2.98223 13.3989 2.99717C13.1161 3.01211 12.8377 2.92933 12.6205 2.76574C12.4033 2.60214 12.2637 2.3701 12.2303 2.117L12.2225 2H7.7775L7.76973 2.117C7.73627 2.3701 7.59669 2.60214 7.37949 2.76574C7.16229 2.92933 6.88388 3.01211 6.60113 2.99717C6.31838 2.98223 6.05264 2.8707 5.85821 2.68537C5.66378 2.50003 5.55532 2.25488 5.55501 2C5.55483 1.49542 5.7666 1.00943 6.14786 0.639452C6.52911 0.269471 7.05169 0.0428433 7.61082 0.00500011L7.7775 0H12.2225Z"
                                fill="black"
                            />
                        </g>
                      </svg>
                    </button>
                    <Link
                      to={`/products/edit/${product._id}`}
                      css={iconButtonEdit}
                      title={t("edit")}
                    >
                      {/* SVG Edit */}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.4">
                          <path d="M17.9143 0.909916C17.5929 0.621362 17.2113 0.392477 16.7914 0.236347C16.3714 0.0802177 15.9212 -9.51677e-05 15.4666 8.46287e-08C15.012 9.5337e-05 14.5619 0.0805968 14.142 0.236902C13.7221 0.393208 13.3406 0.622252 13.0194 0.910942L2.15429 10.675C1.5069 11.2573 1.14318 12.0462 1.14286 12.8688V16.1539C1.14286 16.5785 1.52686 16.9231 2 16.9231H5.68343C6.60114 16.9231 7.48114 16.5949 8.12914 16.0134L18.9863 6.26371C19.6339 5.68113 19.9976 4.89179 19.9976 4.06886C19.9976 3.24593 19.6339 2.4566 18.9863 1.87401L17.9143 0.909916ZM0.857143 18.4616C0.629814 18.4616 0.411797 18.5426 0.251051 18.6869C0.0903058 18.8311 0 19.0268 0 19.2308C0 19.4348 0.0903058 19.6304 0.251051 19.7747C0.411797 19.919 0.629814 20 0.857143 20H19.1429C19.3702 20 19.5882 19.919 19.749 19.7747C19.9097 19.6304 20 19.4348 20 19.2308C20 19.0268 19.9097 18.8311 19.749 18.6869C19.5882 18.5426 19.3702 18.4616 19.1429 18.4616H0.857143Z"
                            fill="black"
                          />
                        </g>
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} css={noDataCell}>
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
  font-family: Inter;
  font-weight: 800;
  font-size: 30px;
  line-height: 100%;
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
    font-size: 20px;
  }

  td {
    font-weight: 600;
  }

  th:first-of-type {
    width: 60px;
  }

  tbody tr:last-of-type td {
    border-bottom: none;
  }
`;

const operationColumn = css`
   width: 120px;
`;

const nameColumn = css`
   width: 50%;
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

const iconButtonEdit = css`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  padding: 0;

  &:hover {
    border: 0;

    svg, g {
      opacity: 1 !important; 
      transition: opacity 0.3s ease;
    }
    
    svg path{
      fill:blue
    }
  }
`;

const iconButtonDelete = css`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  padding: 0;

  &:hover {
    border: 0;

    svg, g {
      opacity: 1 !important; 
      transition: opacity 0.3s ease;
    }
    
    svg path{
      fill:red
    }
  }
`;

export default Products;
