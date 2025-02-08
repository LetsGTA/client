import { NextResponse } from 'next/server';

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
    // Kakao API로 액세스 토큰 요청
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        code,
      }),
    });
    const tokenData = await tokenResponse.json();

    // 액세스 토큰으로 사용자 정보 요청
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const userInfo = await userResponse.json();

    // 사용자 정보를 반환
    return NextResponse.json({ user: userInfo });
  } catch (error) {
    console.error('Kakao OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
