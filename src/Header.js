import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header">
        <NavLink to="/proverbs-game">Home</NavLink>
        <NavLink to="/proverbs-game/number">"What's the Proverb Number?"</NavLink>
        <NavLink to="/proverbs-game/word">"Fill in the missing words"</NavLink>
      </div>
    </>
  );
}
