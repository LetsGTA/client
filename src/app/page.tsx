'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Search } from 'lucide-react';
import Marquee from 'react-fast-marquee';

export default function Home() {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 공지사항 */}
      {showNotice && (
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto py-1 flex items-center justify-between">
            <div className="flex-1 overflow-hidden">
              <div className=" whitespace-nowrap">
                <Marquee pauseOnHover speed={100}>
                  <span className="inline-block px-4">
                    <span className="font-bold">[공지]</span>&nbsp;GTA Online
                    커뮤니티 서비스 개발중입니다. 문의:
                    contact.letsgta@gmail.com
                  </span>
                </Marquee>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowNotice(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <header className="bg-card shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary font-shrikhand"
          >
            Let&apos;s GTA
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="검색..."
                className="pl-10 pr-4 py-2 w-64 rounded-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
            </div>
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 내비게이션 */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto">
          <ul className="flex space-x-6 py-3">
            <li>
              <Link
                href="/best"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                개념글
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                소식/공지
              </Link>
            </li>
            <li>
              <Link
                href="/free"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/tips"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                팁과 노하우
              </Link>
            </li>
            <li>
              <Link
                href="/crew"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                크루모집
              </Link>
            </li>
            <li>
              <Link
                href="/trade"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                거래
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow container mx-auto py-8">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* 메인 콘텐츠 */}
          <div className="flex-grow space-y-8">
            {/* 실시간 인기글 */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">실시간 인기글</h2>
              <ul className="space-y-3">
                {[
                  '카요 페리코 솔로 공략법 (초보자용)',
                  '이번 주 2배보상 컨텐츠 정리',
                  '신규 슈퍼카 &apos;Dewbauchee Champion&apos; 리뷰',
                  'Los Santos Tuners DLC 총정리',
                  '가장 효율적인 돈벌기 방법 (2023년 ver.)',
                ].map((title, index) => (
                  <li key={index} className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      {index + 1}
                    </Badge>
                    <Link
                      href="#"
                      className="text-card-foreground hover:text-primary transition-colors"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 최신글 목록 */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">최신글</h2>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="free">자유</TabsTrigger>
                  <TabsTrigger value="info">정보</TabsTrigger>
                  <TabsTrigger value="qna">질문</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <PostList />
                </TabsContent>
                <TabsContent value="free">
                  <PostList category="자유" />
                </TabsContent>
                <TabsContent value="info">
                  <PostList category="정보" />
                </TabsContent>
                <TabsContent value="qna">
                  <PostList category="질문" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="lg:w-80 space-y-8">
            {/* 로그인 박스 */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">로그인</h3>
              <form className="space-y-4">
                <Input type="text" placeholder="아이디" />
                <Input type="password" placeholder="비밀번호" />
                <div className="flex space-x-2">
                  <Link className="flex-grow" href="/login">
                    <Button className="w-full">로그인</Button>
                  </Link>
                  <Button variant="outline" className="flex-grow">
                    회원가입
                  </Button>
                </div>
              </form>
            </div>

            {/* 실시간 접속자 */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-2">실시간 접속자</h3>
              <p className="text-3xl font-bold text-center text-primary">
                1,234 명
              </p>
            </div>

            {/* 커뮤니티 랭킹 */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">커뮤니티 랭킹</h3>
              <ul className="space-y-2">
                {[
                  { name: '헤이스트마스터', point: 15000 },
                  { name: '로스산토스킹', point: 12500 },
                  { name: 'GTA농부', point: 10000 },
                  { name: '카지노의제왕', point: 9000 },
                  { name: '튜닝장인', point: 8000 },
                ].map((user, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-card-foreground">
                      {index + 1}. {user.name}
                    </span>
                    <span className="text-muted-foreground font-medium">
                      {user.point}p
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-card text-card-foreground py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Let&apos;s GTA</h4>
              <p className="text-sm text-muted-foreground">
                로스 산토스의 모든 것을 한 곳에서 만나보세요.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    책임의 한계와 법적고지
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    고객센터
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">팔로우하기</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PostList({ category }: { category?: string }) {
  const posts = [
    {
      title: '오늘 카지노에서 대박났어요!',
      author: '럭키가이',
      comments: 23,
      views: 1234,
      category: '자유',
    },
    {
      title: '신규 총기 "Heavy Rifle" 성능 분석',
      author: '웨폰매니아',
      comments: 45,
      views: 2345,
      category: '정보',
    },
    {
      title: '첫 헤이스트 도전하는데 팁 좀요',
      author: '뉴비플레이어',
      comments: 67,
      views: 3456,
      category: '질문',
    },
    {
      title: '이번 주 프라임 게이밍 보상 정보',
      author: '정보통',
      comments: 12,
      views: 4567,
      category: '정보',
    },
    {
      title: '나만의 음악 플레이리스트 공유',
      author: '음악좋아',
      comments: 34,
      views: 5678,
      category: '자유',
    },
  ].filter((post) => !category || post.category === category);

  return (
    <ul className="space-y-4">
      {posts.map((post, index) => (
        <li key={index} className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mr-2">
              {post.category}
            </Badge>
            <Link
              href="#"
              className="text-card-foreground hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
            <span className="text-destructive ml-1">[{post.comments}]</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span className="ml-2">조회 {post.views}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
