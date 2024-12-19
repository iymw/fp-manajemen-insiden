'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSolidLock, BiSolidUser } from 'react-icons/bi';

import Button from '@/components/Button';
import Input from '@/components/form/Input';
import Typography from '@/components/Typography';
import api from '@/lib/api';
import { LoginRequest, LoginResponse } from '@/types/entities/login';
import { useState } from 'react';

export default function LoginForm() {
  const [userLogin, setUserLogin] = useState<string>('')
  const router = useRouter();
  const methods = useForm<LoginRequest>();

  const { mutate: handleLogin, isPending } = useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: async data => {
      const res = await api.post<LoginResponse>('/auth/login', data, {
        toastify: true,
      });
      setUserLogin(res.data.user._id)
      return res.data;
    },
    onSuccess: () => router.push(`/login/${userLogin}`),
  });

  const onSubmit = (data: LoginRequest) => handleLogin(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-2'>
          <Input
            id='email'
            label='Username'
            leftIcon={BiSolidUser}
            placeholder='kel4@student.its.ac.id'
          />
          <div className='space-y-1'>
            <Input
              type='password'
              id='password'
              label='Password'
              leftIcon={BiSolidLock}
              placeholder="let's go kel4"
            />
          </div>
        </div>
        <Button
          type='submit'
          variant='success'
          className='w-full bg-purple-400 hover:bg-purple-500 active:bg-purple-700 py-2 md:py-0'
          textClassName='text-white'
          isLoading={isPending}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
