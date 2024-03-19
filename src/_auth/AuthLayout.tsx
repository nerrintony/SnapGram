import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
 const isAuthenticated = false

 return (
  <React.Fragment>
   {isAuthenticated ? (
    <Navigate to="/" />
   ) : (
    <React.Fragment>
     <section className="flex flex-1 justify-center items-center flex-col py-10">
      <Outlet />
     </section>

     <img
      src="/assets/images/side-img.svg"
      alt="logo"
      className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
     />
    </React.Fragment>
   )}
  </React.Fragment>
 )
}

export default AuthLayout
