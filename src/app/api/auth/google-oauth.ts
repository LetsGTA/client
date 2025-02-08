import axios from 'axios';

// Google OAuth 환경 변수
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

// 인증 코드로 Google 액세스 토큰 요청
export const getGoogleToken = async (code: string) => {
  try {
    const response = await axios.post(
      GOOGLE_TOKEN_URL,
      new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data; // { access_token, id_token, refresh_token 등 }
  } catch (error: any) {
    console.error(
      'Error fetching Google token:',
      error.response?.data || error.message,
    );
    throw new Error('Failed to get Google token.');
  }
};

// 액세스 토큰으로 Google 사용자 정보 요청
export const getGoogleUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // 사용자 정보 반환
  } catch (error: any) {
    console.error(
      'Error fetching Google user info:',
      error.response?.data || error.message,
    );
    throw new Error('Failed to get Google user info.');
  }
};
