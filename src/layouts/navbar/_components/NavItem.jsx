import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const NavItem = ({ to, children, className }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "transition-colors",
        isActive
          ? "text-yellow-400"
          : "text-white hover:text-yellow-200",
        className,
      )
    }
  >
    {children}
  </NavLink>
);