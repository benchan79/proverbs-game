import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header">
        <NavLink to="/proverbs-game">Home</NavLink>
        <NavLink to="/proverbs-game/number">Number game</NavLink>
        <NavLink to="/proverbs-game/word">Word game</NavLink>
      </div>
    </>
  );
}
