import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <h1>Something cooking, Goto...</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default App;
