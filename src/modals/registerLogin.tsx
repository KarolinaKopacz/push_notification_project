import { useState } from "react";
import showPwdImg from "../img/log-register/show-password.svg";
import hidePwdImg from "../img/log-register/hide-password.svg";

export const LogInRegisterModal = (props: any) => {
  const {
    titleOfModal,
    loginInputTitle,
    passwordInputTitle,
    buttonTitle,
    loginValue,
    loginFunc,
    passwordValue,
    passwordFunc,
    buttonFunc,
  } = props;

  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <div className="login-modal">
      <div className="small-component">
        <p>{titleOfModal}</p>
      </div>
      <div className="small-component">
        <p>{loginInputTitle}</p>
        <input
          name="login"
          placeholder="Enter login"
          type="text"
          value={loginValue}
          onChange={loginFunc}
        ></input>
      </div>
      <div className="small-component pwd-container">
        <p>{passwordInputTitle}</p>
        <input
          name="password"
          placeholder="Enter password"
          value={passwordValue}
          type={isRevealPwd ? "text" : "password"}
          onChange={passwordFunc}
        />
        <img
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd((prevState) => !prevState)}
        />
      </div>
      <div className="small-component">
        <button name="register_account" onClick={buttonFunc}>
          {buttonTitle}
        </button>
      </div>
    </div>
  );
};
