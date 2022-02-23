import React from 'react'
// const images = {
// 	Strømsgodset: require('../../assets/img/Strom.png'), 
//   Roma: require('../../assets/img/Roma.png'),
//   'Nashe Pivo': require('../../assets/img/NashePivo.png')}

export const AuthSuccess = ({club, money, username, submitLogoutHandler}) => {

  return (
    <div className="auth__succes valign-wrapper" 
    // style={{
    //   height: '80px',
    //   background: `url(${images[club]})`,
    //   backgroundSize: 'contain',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: '50% 0%'
    //}}
    >
      <div className="col s6 center-align">
        Hello, {username}
        <button className="waves-effect waves-light btn-small btn-logout" type="submit" onClick={submitLogoutHandler}>Logout</button>
      </div>
      <h6 className="col s6 center-align">
				<div>{club}</div>
				<div style={{marginTop: '0.8rem', fontSize: '1.5rem'}}>{money.toFixed(2)}</div>
			</h6>
    </div>
  )
}
