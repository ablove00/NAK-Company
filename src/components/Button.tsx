/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  return (
    <button
      css={css`
        background: #007bff;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        &:hover {
          background: #0056b3;
        }
      `}
      {...props}
    />
  );
};