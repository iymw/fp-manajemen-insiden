"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Typography from '@/components/Typography';
import LoginForm from './LoginForm';

export default function IdLoginPage({ params }: { params: { id: string } }) {
  const { id } = useParams();

  return (
    (params.id === id ? (
      <div className='w-full h-screen bg-gradient-to-l from-green-400 via-blue-500 to-indigo-600 flex justify-center items-center'>
        <div className='w-[400px] p-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg flex flex-col justify-center gap-6'>
          <Typography
            as='h1'
            variant='h5'
            weight='bold'
            className='w-full text-center text-typo-dark'
          >
            Next Step
          </Typography>

          <LoginForm />
        </div>
      </div>
    ) : (
      <></>
    ))
  );
}
