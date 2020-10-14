import React from 'react'
const images = {
	Strømsgodset: require('../../assets/img/Strom.png'), 
	Roma: require('../../assets/img/Roma.png')}

export const AuthSuccess = ({club, money, nickname, submitLogoutHandler}) => {

  return (
    <div className="auth__succes valign-wrapper" style={{
      height: '80px',
      background: `url(${images[club]})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 0%'
    }}>
      <div className="col s4 center-align">
        Hello, {nickname} <br/>
        <button className="waves-effect waves-light btn-small btn-logout" type="submit" onClick={submitLogoutHandler}>Logout</button>
      </div>
      <h6 className="col s5 offset-s3 center-align">
				<div>{club}</div>
				<div style={{marginTop: '0.8rem', fontSize: '1.5rem'}}>{money}</div>
			</h6>
    </div>
  )
}
