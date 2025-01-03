import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../../assets/others/authentication1.png";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import GoogleSignIn from "../../../components/SocialSignIn/GoogleSignIn";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleValidateCaptcha = (e) => {
    const captcha_value = e.target.value;
    // console.log(captcha_value);
    if (validateCaptcha(captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    login(email, password).then((result) => {
      const user = result.user;
      console.log(user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Successfully Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro | Login</title>
      </Helmet>
      <div className="hero bg-[#262a48] min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left flex-1">
            <h1 className="text-3xl text-[#787663] md:text-5xl font-bold mb-5 text-center">
              Login <span className="text-[#c38920]">now!</span>
            </h1>
            <img src={loginImg} alt="Authentication Image" />
          </div>
          <div className="card bg-[#262a48] w-full max-w-sm shrink-0 flex-1">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white font-semibold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  onBlur={handleValidateCaptcha}
                  placeholder="Please enter above text"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className={`${
                    disabled
                      ? "btn btn-disabled bg-red-500"
                      : "btn bg-[#c38920] border-0 text-white"
                  }`}
                  type="submit"
                  value="LOGIN"
                />
              </div>
            </form>

            <div className="w-full">
              <GoogleSignIn></GoogleSignIn>
            </div>

            <div>
              <p className="text-center pb-7 text-white">
                Did not signup yet?
                <Link to={"/signup"}>
                  <span className="text-[#787663]"> Signup</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
