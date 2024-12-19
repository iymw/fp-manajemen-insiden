import Link from 'next/link';

import Typography from '@/components/Typography';

import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className='w-full h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center'>
      <div className='w-[400px] p-8 rounded-xl shadow-lg bg-white/80 backdrop-blur-lg flex flex-col justify-center gap-6'>
        <Typography
          weight='bold'
          className='w-full text-center text-[32px] text-black/80'
        >
          Login
        </Typography>

        <LoginForm />
      </div>
    </div>
  );
}
