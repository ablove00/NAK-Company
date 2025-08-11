// MyNavLink.tsx
import React, { ReactNode } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { SerializedStyles } from "@emotion/react";

interface MyNavLinkProps {
  to: string;
  children: ReactNode;
  menuItemStyle: SerializedStyles;
  menuItemActiveStyle: SerializedStyles;
}

const MyNavLink: React.FC<MyNavLinkProps> = ({
  to,
  children,
  menuItemStyle,
  menuItemActiveStyle,
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <NavLink
      to={to}
      // @emotion/react prop
      css={[menuItemStyle, match ? menuItemActiveStyle : null]}
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;
