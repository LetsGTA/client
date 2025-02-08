import { NextResponse } from 'next/server';
import { getGoogleToken, getGoogleUserInfo } from '@/app/api/auth/google-oauth';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing code parameter' },
      { status: 400 },
    );
  }

  try {
    // 1. 인증 코드로 액세스 토큰 요청
    const tokenData = await getGoogleToken(code);

    // 2. 액세스 토큰으로 사용자 정보 요청
    const userInfo = await getGoogleUserInfo(tokenData.access_token);

    // 3. 사용자 정보를 반환
    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
