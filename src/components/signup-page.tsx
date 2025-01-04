'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSendVerification = () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: '올바른 이메일 형식이 아닙니다.',
      }));
      return;
    }

    console.log('Sending verification code to:', formData.email);
    setIsVerificationSent(true);
  };

  const handleVerifyEmail = () => {
    if (!formData.verificationCode) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: '인증 코드를 입력해주세요.',
      }));
      return;
    }
    console.log('Verifying code:', formData.verificationCode);
    setIsEmailVerified(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!isEmailVerified) {
      newErrors.email = '이메일 인증이 필요합니다.';
    }
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }
    if (!formData.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', { ...formData, receiveEmails });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <div className="flex gap-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={handleChange}
                disabled={isEmailVerified}
                className={errors.email ? 'border-red-500' : ''}
              />
              <Button
                type="button"
                onClick={handleSendVerification}
                disabled={isEmailVerified}
              >
                인증하기
              </Button>
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {isVerificationSent && !isEmailVerified && (
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="text-sm font-medium">
                인증 코드
              </label>
              <div className="flex gap-2">
                <Input
                  id="verificationCode"
                  name="verificationCode"
                  placeholder="인증 코드를 입력하세요"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className={errors.verificationCode ? 'border-red-500' : ''}
                />
                <Button type="button" onClick={handleVerifyEmail}>
                  확인
                </Button>
              </div>
              {errors.verificationCode && (
                <p className="text-sm text-red-500">
                  {errors.verificationCode}
                </p>
              )}
            </div>
          )}

          {isEmailVerified && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
              이메일이 성공적으로 인증되었습니다.
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordConfirm" className="text-sm font-medium">
              비밀번호 확인
            </label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className={errors.passwordConfirm ? 'border-red-500' : ''}
            />
            {errors.passwordConfirm && (
              <p className="text-sm text-red-500">{errors.passwordConfirm}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="nickname" className="text-sm font-medium">
              닉네임
            </label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleChange}
              className={errors.nickname ? 'border-red-500' : ''}
            />
            {errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="receiveEmails"
              checked={receiveEmails}
              onCheckedChange={(checked) =>
                setReceiveEmails(checked as boolean)
              }
            />
            <label
              htmlFor="receiveEmails"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              이벤트 등 알림을 이메일로 받기
            </label>
          </div>

          <Button type="submit" className="w-full">
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
