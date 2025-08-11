/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(167.98deg, #f4f4f4 0%, #f6f6f6 100%);
          font-family: 'IRANSans', sans-serif;
        }

        #root{
          width: 100%;
        }
      `}
    />
  );
}
