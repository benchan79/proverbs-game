// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { Button } from "./Button";

const styles = {
  marginLeft: 20,
  fontSize: 25,
};

function Home() {
  // const navigate = useNavigate();

  return (
    <div style={styles}>
      <h1>Welcome to the Proverbs Game!</h1>
      <p />
      <Link to="/proverbs-game/number">Play "What's the Proverb Number?"</Link>
      {/* <Button
            onClick={() => {navigate("/proverbs-game/number")}}
            label="Number"
          /> */}
      <p />
      <Link to="/proverbs-game/word">Play "Fill in the missing words"</Link>
      {/* <Button
            onClick={() => {navigate("/proverbs-game/word")}}
            label="Word"
          /> */}
    </div>
  );
}

export default Home;
