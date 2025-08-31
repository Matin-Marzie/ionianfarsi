import useLogout from "../../hooks/useLogout";
import { useNavigate, Link, useLocation } from "react-router-dom"
import useAuth from "../../hooks/UseAuth";

function AuthPanel() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const logout = useLogout();
  const navigate = useNavigate();

  const SignOut = async () => {
    await logout();
    navigate('/home')
  }

  return (
    <section className="w-full m-auto bg-white text-center flex flex-col items-center justify-end pb-3 gap-3">
      {isLoggedIn

        ?
        (<button onClick={SignOut} className={`w-11/12 border py-2 io-button bg-red-500`}>Sign Out</button>)
        :
        (<div className="w-11/12 flex gap-x-2">
          
          <Link to="/login" state={{from: location}} replace className="w-11/12 border py-2 io-button bg-bluesea">Sign In</Link>
          <Link to="/register" className="w-11/12 border py-2 io-button bg-bluesea">Create Account</Link>
        </div>)
      }


    </section>
  )
}

export default AuthPanel