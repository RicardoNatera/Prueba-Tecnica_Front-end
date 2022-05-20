import React from 'react'

function UserInfo({userData}) {
  return (
    <>
        <br />
        <img className="circle" alt="Avatar" src={userData.avatar_url}/>
        <h5>{userData.name}</h5>
        <h4>{userData.bio}</h4>
        <h5>Trabajando Actualmente: {userData.hireable == null ? "Si":"No"}</h5>
        <h6>Seguidores: {userData.followers}</h6>
    </>
  )
}

export default UserInfo