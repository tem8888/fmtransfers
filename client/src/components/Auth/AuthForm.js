import React from 'react'

export const AuthForm = ({submitLoginHandler, inputLoginHandler, inputLogin, errorMsg, errors}) => {
  return (
    <form className="auth__form" onSubmit={submitLoginHandler}>
      <div className="col s5 offset-s2">

        <input className={!errors.username ? "auth__input" : "auth__input invalid"}
          type="text" placeholder="username" name="username"
          value={inputLogin.username} onChange={inputLoginHandler}
        />
        <input className={!errors.password ? "auth__input" : "auth__input invalid"} 
        type="password" placeholder="password" name="password"
        value={inputLogin.password} onChange={inputLoginHandler}
        />

        {errorMsg ? <div className="error-msg">Login error.</div>: ""}
      </div>

        <button className="waves-effect waves-light btn-large btn-login" type="submit">Login</button>
    </form>
  )
}
