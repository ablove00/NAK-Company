/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../api/axios";
import MainLayout from "../components/MainLayout";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useTranslation } from "react-i18next";
import { useConfirm } from "../hooks/useConfirm";

// ================= Types =================
type Attribute = {
    _id: string;
    name: string;
    values: string[];
};

type SelectedAttr = {
    attrId: string;
    locked: boolean;
};

type ProductFormData = {
    name: string;
};

// ================= Styles =================
const containerStyle = css`
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  padding: 20px;
`;

const titleStyle = css`
  margin-bottom: 75px;
  font-family: Inter;
  font-weight: 800;
  font-size: 30px;
`;

const titleStyleH3 = css`
  margin-bottom: 0px;
  font-family: Inter;
  font-weight: 700;
  font-size: 30px;
`;


const formStyle = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 30px;
`;

const actionRowStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
`;

const rowFlex = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const inputNameGroupStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const labelNameStyle = (lang: string = "en") => css`
  position: absolute;
  top: -15px;
  ${lang === "fa" ? "right" : "left"}: 70px;
  background: linear-gradient(167.98deg, #f4f4f4 0%, #f6f6f6 100%);;
  padding: 0 20px;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;

`;

const textNameInputStyle = css`
  height: 70px;
  border-radius: 40px;
  border: 1px solid #00000066;
  background: #ffffff66;
  padding: 0 20px;
  font-size: 20px;
  width: 360px;
`;

const selectStyle = css`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 400px;
  height: 70px;
  border-radius: 40px;
  background: #00000005;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  color: #000;
  padding: 0 20px;
  border: none;

  &:disabled{
   background: #fff;
   border: 1px solid #00000066;
  }
  &:enabled {
    background: #ffffff66;
    border: 1px solid #ffffff66;
  }
`;

const inputPlaceholderStyle = css`
  background: #ffffff66;
  border: 0px solid #00000066;
`;

const selectWrapperStyle = (lang: string = "en") => css`
  position: relative;
  display: inline-block;
  width: 100%;
  svg {
    position: absolute;
    ${lang === "fa" ? "left" : "right"}: 20px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const inputReadonlyStyle = css`
  width: 400px;
  height: 70px;
  border-radius: 40px;
  border: 1px solid #00000066;
  background: #fff;
  font-family: Inter;
  font-weight: 600;
  font-size: 20px;
  padding: 0 20px;
  color: #000;
  width: 360px;
`;

const inputAttrColumn = css`
   width: 400px;
`;

const operationAttrColumn = css`
   width: 100px;
`;


const addBtn = css`
  width: 100px;
  height: 70px;
  border-radius: 40px;
  border: 1px solid #000;
  background: white;
  font-weight: 600;
  cursor: pointer;
  font-family: Inter;
  font-style: Semi Bold;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 40px;
  letter-spacing: 0%;
  transition: background 0.3s ease, color 0.3s ease;
  color: #000;
  background: #00000005;

  &:hover {
    background: #000;
    color: white;
    border: 1px solid #000; 
  }
`;

const deleteBtn = css`
  width: 100px;
  height: 70px;
  border-radius: 40px;
  border: 1px solid red;
  background: white;
  font-weight: 600;
  color: red;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  background: #00000005;


  &:hover {
    border: 1px solid red;
    background: red;
    color: white;

    svg path{
        fill: white;
    }

  }
`;

const tableStyle = css`
  width: 100%;
  margin-top: 0px;
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

const tdIndexColumn = css`
   width: 50px;
`;

const tdOperationColumn = css`
   width: 100px;
`;

const deletTdBtn = css`
    border:0px;
    &:hover {
        svg path{
            fill: black;
        }
    }
`;

const tdInput = css`
    width: 200;
    height: 40;
    border-radius: 4px;
    border-width: 1px;
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    leading-trim: NONE;
    line-height: 40px;
    letter-spacing: 0%;
    border: 1px solid #000000;
    color:#000;
    text-align: center;
`;


const noDataCell = css`
  text-align: center;
  padding: 15px;
  font-style: italic;
  color: #999;
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
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #000;
    color: white;
  }
`;

const updateButtonStyle = css`
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
  &:hover {
    background: transparent;
    color: #000;
    border: 1px solid #000;
  }
`;

const errorText = css`
  font-size: 14px;
  color: red;
  margin-top: 0px;
  margin-bottom: 5px;
`;

// ================= Component =================
export function ProductAdd() {
    const { t, i18n } = useTranslation();
    const confirm = useConfirm();
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "NAK Company - Add " + t("products");
    }, []);

    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [selectedAttrs, setSelectedAttrs] = useState<SelectedAttr[]>([
        { attrId: "", locked: false },
    ]);
    const [models, setModels] = useState<
        { model: string; price: number; numberInStock: number }[]
    >([]);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<ProductFormData>({
        defaultValues: { name: ""},
    });

    // --- Fetch Attributes ---
    useEffect(() => {
        if (!token) return;
        api
            .get("/attributes", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setAttributes(res.data || []);
            })
            .catch((err) => {
                toast.error(t("attributes_fetch_error"));
            });
    }, [token]);

    // --- Generate models based on selected attributes ---
    useEffect(() => {
        const lockedAttrs = selectedAttrs
            .filter((a) => a.locked && a.attrId)
            .map((a) => attributes.find((att) => att._id === a.attrId))
            .filter(Boolean) as Attribute[];

        if (lockedAttrs.length === 0) {
            setModels([]);
            return;
        }

        const combinations = lockedAttrs.reduce<string[][]>(
            (acc, attr) => {
                const vals = attr.values;
                if (acc.length === 0) {
                    return vals.map((v) => [v]);
                }
                const newComb: string[][] = [];
                acc.forEach((comb) => {
                    vals.forEach((val) => {
                        newComb.push([...comb, val]);
                    });
                });
                return newComb;
            },
            [] as string[][]
        );

        setModels(
            combinations.map((combo) => ({
                model: combo.join(" / "),
                price: 0,
                numberInStock: 0,
            }))
        );
    }, [selectedAttrs, attributes]);

    // --- Handlers ---
    const handleAttrChange = (index: number, attrId: string) => {
        const updated = [...selectedAttrs];
        updated[index].attrId = attrId;
        setSelectedAttrs(updated);
    };

    const handleAdd = (index: number) => {
        const updated = [...selectedAttrs];
        updated[index].locked = true;
        setSelectedAttrs([...updated, { attrId: "", locked: false }]);
    };

    const handleDeleteAttr = async (index: number) => {
        const name = attributes[index]?.name || "";

        const result = await confirm(t("confirm_delete_attr", { name }));
        if (!result) return;

        const updated = selectedAttrs.filter((_, i) => i !== index);
        setSelectedAttrs(updated);
    };

    const handleDeleteModel = async(index: number) => {
        const name = models[index]?.model || "";

        const result = await confirm(t("confirm_delete_sku", { name }));
        if (!result) return;

        const updated = [...models];
        updated.splice(index, 1);
        setModels(updated);
    };

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        const mappedAttributes = selectedAttrs
        .map(({ attrId }) => attributes.find(attr => attr._id === attrId))
        .filter(Boolean)
        .map(attr => ({
            name: attr!.name,
            values: attr!.values,  
        }));

        try {
            const results = await Promise.all(
            models.map(sku => 
                api.post("/skus", {
                model: sku.model,
                price: sku.price.toString(),        
                numberInStock: sku.numberInStock.toString(),  
                })
            )
            );
            const skusIds = results.map(res => res.data._id);

            const  payload = {
                name: data.name,
                skusIds,
                attributes: mappedAttributes,
            };

            const response = await api.post("/products", payload);

            toast.success(t("product_saved_success"));
            navigate("/products");
        } catch (error: any){
            const serverMessage = error?.response?.data?.message;

            if (serverMessage) {
                toast.error(serverMessage);
            } else {
                toast.error(t("product_save_error"));
            }
        }
    };


    if (!token) return <p>{t("loadingUser")}</p>;

    return (
        <MainLayout>
            <div css={containerStyle}>
                <h1 css={titleStyle}>Products</h1>
                <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
                    {/* Row 1 */}
                    <div>
                        <div css={inputNameGroupStyle}>
                            <label css={labelNameStyle(i18n.language)}>Name</label>
                            <input
                                {...register("name", {
                                    required: t("product_name_required"),
                                    minLength: { value: 3, message: t("product_name_min_length")
                                    },
                                })}
                                placeholder={t("name")}
                                css={textNameInputStyle}
                            />
                            {errors.name && <span css={errorText}>{errors.name.message}</span>}

                        </div>
                    </div>

                    {/* Row 2 */}
                    <div css={rowFlex}>
                        <div css={inputAttrColumn}>
                            <h3 css={titleStyleH3}>{t("attribute_name")}</h3>
                        </div>
                        <div css={inputAttrColumn}>
                            <h3 css={titleStyleH3}>{t("attribute_values")}</h3>
                        </div>
                        <div css={operationAttrColumn}></div>
                    </div>
                    {selectedAttrs.map((sel, idx) => {
                        const remainingAvailableCount = attributes.filter(
                            (att) => !selectedAttrs.some((s) => s.locked && s.attrId === att._id)
                        ).length;

                        if (!sel.attrId && !sel.locked && remainingAvailableCount === 0) {
                            return null;
                        }

                        const availableAttrs = attributes.filter(
                            (att) =>
                                !selectedAttrs.some(
                                    (s, i) => s.attrId === att._id && i !== idx && s.locked
                                )
                        );
                        const selectedAttr = attributes.find(
                            (att) => att._id === sel.attrId
                        );
                        return (

                            <div key={idx} css={rowFlex}>
                                {/* Attribute Name */}
                                <div css={inputAttrColumn}>
                                    <div css={selectWrapperStyle(i18n.language)}>
                                        <select
                                            css={selectStyle}
                                            value={sel.attrId}
                                            disabled={sel.locked}
                                            onChange={(e) => handleAttrChange(idx, e.target.value)}
                                        >
                                            <option value="">{t("select_attribute")}</option>
                                            {availableAttrs.map((att) => (
                                                <option key={att._id} value={att._id}>
                                                    {att.name}
                                                </option>
                                            ))}
                                        </select>
                                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.4738 0.532937C19.3081 0.363998 19.1113 0.229969 18.8946 0.13852C18.6779 0.0470718 18.4456 0 18.211 0C17.9764 0 17.7442 0.0470718 17.5275 0.13852C17.3108 0.229969 17.114 0.363998 16.9482 0.532937L9.99844 7.60367L3.04864 0.532937C2.71372 0.192198 2.25949 0.000771642 1.78585 0.000771642C1.31221 0.000771642 0.857971 0.192198 0.52306 0.532937C0.188148 0.873677 0 1.33582 0 1.8177C0 2.29958 0.188148 2.76172 0.52306 3.10246L8.74461 11.4671C8.91032 11.636 9.10715 11.77 9.32384 11.8615C9.54052 11.9529 9.77281 12 10.0074 12C10.242 12 10.4743 11.9529 10.691 11.8615C10.9076 11.77 11.1045 11.636 11.2702 11.4671L19.4917 3.10246C20.1724 2.40996 20.1724 1.24366 19.4738 0.532937Z" fill="black" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Attribute Values */}
                                <div css={inputAttrColumn}>
                                    <input
                                        css={[
                                            inputReadonlyStyle,
                                            (!selectedAttr || !selectedAttr.values.length) && inputPlaceholderStyle
                                        ]}
                                        readOnly
                                        value={selectedAttr ? selectedAttr.values.join(", ") : ""}
                                    />
                                </div>

                                {/* Action */}
                                <div css={operationAttrColumn}>
                                    {!sel.locked ? (
                                        <button
                                            type="button"
                                            css={addBtn}
                                            disabled={!sel.attrId}
                                            onClick={() => handleAdd(idx)}
                                        >
                                            {t("add")}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            css={deleteBtn}
                                            onClick={() => handleDeleteAttr(idx)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="#C50000"
                                                    d="M18.89 4C19.1732 4.00028 19.4456 4.09788 19.6516 4.27285C19.8575 4.44782 19.9815 4.68695 19.9981 4.94139C20.0147 5.19584 19.9227 5.44638 19.7409 5.64183C19.5591 5.83729 19.3013 5.9629 19.02 5.993L18.89 6H18.8L17.7787 17C17.7788 17.7652 17.4539 18.5015 16.8705 19.0583C16.2872 19.615 15.4894 19.9501 14.6406 19.995L14.445 20H5.55501C3.77923 20 2.32794 18.751 2.23015 17.25L2.2246 17.083L1.19892 6H1.11002C0.826782 5.99972 0.554357 5.90212 0.348403 5.72715C0.142448 5.55218 0.0185102 5.31305 0.00191139 5.05861C-0.0146875 4.80416 0.0773059 4.55362 0.259095 4.35817C0.440885 4.16271 0.698749 4.0371 0.980001 4.007L1.11002 4H18.89ZM12.2225 0C12.8119 0 13.3772 0.210714 13.794 0.585786C14.2108 0.960859 14.445 1.46957 14.445 2C14.4447 2.25488 14.3362 2.50003 14.1418 2.68537C13.9474 2.8707 13.6816 2.98223 13.3989 2.99717C13.1161 3.01211 12.8377 2.92933 12.6205 2.76574C12.4033 2.60214 12.2637 2.3701 12.2303 2.117L12.2225 2H7.7775L7.76973 2.117C7.73627 2.3701 7.59669 2.60214 7.37949 2.76574C7.16229 2.92933 6.88388 3.01211 6.60113 2.99717C6.31838 2.98223 6.05264 2.8707 5.85821 2.68537C5.66378 2.50003 5.55532 2.25488 5.55501 2C5.55483 1.49542 5.7666 1.00943 6.14786 0.639452C6.52911 0.269471 7.05169 0.0428433 7.61082 0.00500011L7.7775 0H12.2225Z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Row 3 */}
                    <div css={rowFlex}>
                        <div css={inputAttrColumn}>
                            <h3 css={titleStyleH3}>{t("skus_list")}</h3>
                        </div>
                    </div>
                    <table css={tableStyle}>
                        <thead>
                            <tr>
                                <th css={tdIndexColumn}>#</th>
                                <th>{t("skus_list")}</th>
                                <th>{t("price")}</th>
                                <th>{t("in_stock")}</th>
                                <th css={tdOperationColumn}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.length > 0 ? (
                                models.map((m, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{m.model}</td>
                                        <td>
                                            <input
                                                css={tdInput}
                                                type="number"
                                                value={m.price}
                                                onChange={(e) => {
                                                    const updated = [...models];
                                                    updated[i].price = +e.target.value;
                                                    setModels(updated);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                css={tdInput}
                                                type="number"
                                                value={m.numberInStock}
                                                onChange={(e) => {
                                                    const updated = [...models];
                                                    updated[i].numberInStock = +e.target.value;
                                                    setModels(updated);
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                css={deletTdBtn}
                                                type="button"
                                                onClick={() => handleDeleteModel(i)}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#C50000"
                                                        d="M18.89 4C19.1732 4.00028 19.4456 4.09788 19.6516 4.27285C19.8575 4.44782 19.9815 4.68695 19.9981 4.94139C20.0147 5.19584 19.9227 5.44638 19.7409 5.64183C19.5591 5.83729 19.3013 5.9629 19.02 5.993L18.89 6H18.8L17.7787 17C17.7788 17.7652 17.4539 18.5015 16.8705 19.0583C16.2872 19.615 15.4894 19.9501 14.6406 19.995L14.445 20H5.55501C3.77923 20 2.32794 18.751 2.23015 17.25L2.2246 17.083L1.19892 6H1.11002C0.826782 5.99972 0.554357 5.90212 0.348403 5.72715C0.142448 5.55218 0.0185102 5.31305 0.00191139 5.05861C-0.0146875 4.80416 0.0773059 4.55362 0.259095 4.35817C0.440885 4.16271 0.698749 4.0371 0.980001 4.007L1.11002 4H18.89ZM12.2225 0C12.8119 0 13.3772 0.210714 13.794 0.585786C14.2108 0.960859 14.445 1.46957 14.445 2C14.4447 2.25488 14.3362 2.50003 14.1418 2.68537C13.9474 2.8707 13.6816 2.98223 13.3989 2.99717C13.1161 3.01211 12.8377 2.92933 12.6205 2.76574C12.4033 2.60214 12.2637 2.3701 12.2303 2.117L12.2225 2H7.7775L7.76973 2.117C7.73627 2.3701 7.59669 2.60214 7.37949 2.76574C7.16229 2.92933 6.88388 3.01211 6.60113 2.99717C6.31838 2.98223 6.05264 2.8707 5.85821 2.68537C5.66378 2.50003 5.55532 2.25488 5.55501 2C5.55483 1.49542 5.7666 1.00943 6.14786 0.639452C6.52911 0.269471 7.05169 0.0428433 7.61082 0.00500011L7.7775 0H12.2225Z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} css={noDataCell}>
                                        {t("no_data_found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Row 4 */}
                    <div css={actionRowStyle}>
                        <Link to="/products" css={cancelButtonStyle}>
                            {t("cancel")}
                        </Link>
                        <button type="submit" css={updateButtonStyle}>
                            {isSubmitting ? t("createL") + "..." : (<span>{t("create")}</span>)}
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
