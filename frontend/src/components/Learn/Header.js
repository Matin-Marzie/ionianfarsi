import useAuth from '../../hooks/UseAuth'

const Header = () => {
  const { auth } = useAuth();

  return (
    <header className=''>
      <ul className="flex w-full bg-white text-3xl justify-between py-1 px-2.5">
        <li className='flex'>
          <div>{auth?.user?.level ?? 'N'}</div>
          <span className='pl-1'>🇮🇷</span>
        </li>
        <li className='flex'>
          <div>{auth?.user?.coin ?? 0}</div>
          <span className='pl-0'>🪙</span>
        </li>
        <li className='flex'>
          <div>{auth?.user?.experience ?? 0}</div>
          <span className='pl-1 text-green-500 font-bold'>XP</span>
        </li>
        <li className='flex'>
          <div>{auth?.user?.energy ?? 5}</div>
          <span className='pl-0'>⚡️</span>
        </li>
      </ul>
    </header>
  );
};


export default Header
