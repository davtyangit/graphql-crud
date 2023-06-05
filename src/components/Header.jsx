import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <NavLink to={"/"}>Toys</NavLink>
      <NavLink to={"/add"}>Add</NavLink>
    </nav>
  );
};

export default Header;
