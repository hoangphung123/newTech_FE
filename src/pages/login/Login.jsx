import "./login.scss";
import { useState, useContext} from "react";
import { notify } from "../../untils/helpers/notify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext"

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await login({ username, password });
      // localStorage.setItem("user", "admin");
      navigate("/");
      // window.location.reload();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          {/* Additional content for the left side */}
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Mssv"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
