'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import Image from 'next/image';
import { SiEpicgames } from 'react-icons/si';
import { FaSteam, FaXbox, FaPlaystation } from 'react-icons/fa';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 로그인 로직을 구현하세요
    console.log('Login attempt with:', email, password, saveId, stayLoggedIn);
  };

  const handleOAuthLogin = (provider: string) => {
    // 여기에 OAuth 로그인 로직을 구현하세요
    console.log(`${provider} login attempted`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveId"
                checked={saveId}
                onCheckedChange={(checked) => setSaveId(checked as boolean)}
              />
              <label
                htmlFor="saveId"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                아이디 저장
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stayLoggedIn"
                checked={stayLoggedIn}
                onCheckedChange={(checked) =>
                  setStayLoggedIn(checked as boolean)
                }
              />
              <label
                htmlFor="stayLoggedIn"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                로그인 유지
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>
        <div className="mt-5">
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                또는 다른 계정으로 로그인
              </span>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <Button
              className="w-full h-12 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 relative"
              onClick={() => handleOAuthLogin('Google')}
            >
              <div className="absolute left-4">
                <Image
                  src="/google.png"
                  alt="Google Logo"
                  width={18}
                  height={18}
                />
              </div>
              <span className="flex-grow text-center">Google로 로그인</span>
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] relative"
              onClick={() => handleOAuthLogin('Kakao')}
            >
              <div className="absolute left-4">
                <Image
                  src="/kakao.svg"
                  alt="Kakao Logo"
                  width={18}
                  height={18}
                />
              </div>
              <span className="flex-grow text-center">카카오로 로그인</span>
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center bg-[#2F2D2E] hover:bg-[#1A1A1A] text-white relative"
              onClick={() => handleOAuthLogin('Epic Games')}
            >
              <div className="absolute left-4">
                <SiEpicgames className="w-5 h-5" />
              </div>
              <span className="flex-grow text-center">Epic Games로 로그인</span>
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center bg-[#171A21] hover:bg-[#2A475E] text-white relative"
              onClick={() => handleOAuthLogin('Steam')}
            >
              <div className="absolute left-4">
                <FaSteam className="w-5 h-5" />
              </div>
              <span className="flex-grow text-center">
                Steam
                <span className="text-[10px] align-super ml-[1px]">®</span>으로
                로그인
              </span>
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center bg-[#107C10] hover:bg-[#0E6A0E] text-white relative"
              onClick={() => handleOAuthLogin('Xbox')}
            >
              <div className="absolute left-4">
                <FaXbox className="w-5 h-5" />
              </div>
              <span className="flex-grow text-center">Xbox로 로그인</span>
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center bg-[#003791] hover:bg-[#002D73] text-white relative"
              onClick={() => handleOAuthLogin('PlayStation')}
            >
              <div className="absolute left-4">
                <FaPlaystation className="w-5 h-5" />
              </div>
              <span className="flex-grow text-center">
                PlayStation으로 로그인
              </span>
            </Button>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          <Link href="/signup" className="text-blue-600 hover:underline">
            회원가입
          </Link>
          <span className="mx-2">|</span>
          <Link href="/forgot-email" className="text-blue-600 hover:underline">
            이메일 찾기
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
}
