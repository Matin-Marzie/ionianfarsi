import useAuth from '../../../hooks/UseAuth'

const LearnHeader = () => {
  const { auth } = useAuth();

  return (
    <header className='sticky top-0 z-20'>
      <ul className="flex w-full border-b-2 border-black bg-white text-3xl justify-between py-1">
        <li>
          {auth?.user?.level ?? 'N'} 🇮🇷
        </li>
        <li>
          {auth?.user?.coin ?? 0} 🪙
        </li>
        <li className='font-'>
          {auth?.user?.experience ?? 0} XP
        </li>
        <li>
          {auth?.user?.energy ?? 5} ⚡️
        </li>
      </ul>
    </header>
  );
};


export default LearnHeader
