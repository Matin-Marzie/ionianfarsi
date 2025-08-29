import useAuth from '../../hooks/UseAuth'

const Header = () => {
  const { auth } = useAuth();

  return (
    <header className=''>
      <ul className="flex w-full bg-white text-3xl justify-between py-1">
        <li>
          {auth?.user?.level ?? 'N'} 🇮🇷
        </li>
        <li>
          {auth?.user?.coin ?? 0} 🪙
        </li>
        <li className='font-'>
          {auth?.user?.experience ?? 0} <span className='text-green-500 font-bold'>XP</span>
        </li>
        <li>
          {auth?.user?.energy ?? 5} ⚡️
        </li>
      </ul>
    </header>
  );
};


export default Header
