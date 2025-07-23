import useLogout from "../../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom"

function More() {  
  const logout = useLogout();
  const navigate = useNavigate();

  const SignOut = async () => {
    await logout();
    navigate('/home')
  }

  return (
    <section className="w-full h-full max-w-md m-auto bg-white text-center flex flex-col items-center justify-start p-2 gap-3">
      <button className={`w-11/12 border py-2 io-button bg-bluesea`}>Sign Up</button>
      <button className={`w-11/12 border py-2 io-button bg-bluesea`}>Sign In</button>
      <button onClick={SignOut}             className={`w-11/12 border py-2 io-button bg-bluesea`}>Sign Out</button>
    </section>
  )
}

export default More