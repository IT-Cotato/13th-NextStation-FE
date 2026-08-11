import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AuthApiError,
  type AuthTermDetail,
  type AuthTermType,
  getTerm,
} from '@/api/auth';
import Header from '@/components/Header';

function isAuthTermType(value: string | undefined): value is AuthTermType {
  return value === 'SERVICE' || value === 'PRIVACY' || value === 'MARKETING';
}

function renderInlineLinks(line: string) {
  const linkPattern =
    /(https?:\/\/[^\s<>'"]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
  const parts = line.split(linkPattern);

  return parts.map((part, index) => {
    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={`mailto:${part}`}
          className="text-primary-70 underline"
        >
          {part}
        </a>
      );
    }

    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer"
          className="text-primary-70 underline"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

function renderTermContent(content: string) {
  const lines = content.split(/\r?\n/);
  let hasSkippedDocumentTitle = false;

  return lines.map((line, index) => {
    const trimmedLine = line.replace(/\u200B/g, '').trim();
    const markdownHeading = trimmedLine.match(/^(#{1,6})\s+(.+)$/);

    if (markdownHeading) {
      const headingLevel = markdownHeading[1].length;
      const heading = markdownHeading[2];

      if (headingLevel === 1 && !hasSkippedDocumentTitle) {
        hasSkippedDocumentTitle = true;
        return null;
      }

      return (
        <p
          key={index}
          className="mt-[10px] text-[12px] font-semibold tracking-[-0.3px] first:mt-0"
        >
          {heading}
        </p>
      );
    }

    if (!trimmedLine) {
      return null;
    }

    const indentation = line.match(/^\s*/)?.[0].replace(/\t/g, '    ').length ?? 0;
    const numberedItem = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    const bulletedItem = trimmedLine.match(/^[-*•]\s+(.+)$/);
    const standaloneEmail = trimmedLine.match(
      /^([^.!?]+):\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/,
    );

    if (standaloneEmail) {
      const contactLabel = standaloneEmail[1]
        .replace(/^(?:\s*[-*•]\s*)+/u, '')
        .trimStart();

      return (
        <p key={index} className="pl-[8px] text-primary-70">
          <span aria-hidden="true">• </span>
          {contactLabel}:{' '}
          <a href={`mailto:${standaloneEmail[2]}`} className="underline">
            {standaloneEmail[2]}
          </a>
        </p>
      );
    }

    if (numberedItem) {
      return (
        <p
          key={index}
          className="-indent-[14px]"
          style={{ paddingLeft: 14 + indentation * 3.5 }}
        >
          {numberedItem[1]}. {renderInlineLinks(numberedItem[2])}
        </p>
      );
    }

    if (bulletedItem) {
      const bulletContent = bulletedItem[1].trimStart();
      const containsEmail =
        /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(bulletContent);
      const contactLabelIndex = bulletContent.indexOf('개인정보');
      const visibleBulletContent = containsEmail
        ? bulletContent.slice(Math.max(contactLabelIndex, 0))
        : bulletContent.replace(/^(?:\s*[-*•]\s*)+/u, '').trimStart();

      return (
        <p
          key={index}
          className={`-indent-[14px] ${containsEmail ? 'text-primary-70' : ''}`}
          style={{ paddingLeft: 14 + indentation * 3.5 }}
        >
          • {renderInlineLinks(visibleBulletContent)}
        </p>
      );
    }

    return <p key={index}>{renderInlineLinks(line)}</p>;
  });
}

export default function TermDetailPage() {
  const { type } = useParams();
  const [term, setTerm] = useState<AuthTermDetail | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isAuthTermType(type)) {
      return;
    }

    let isCancelled = false;

    const loadTerm = async () => {
      try {
        const response = await getTerm(type);
        if (!isCancelled) setTerm(response);
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(
            error instanceof AuthApiError
              ? error.message
              : '약관 정보를 불러오지 못했습니다.',
          );
        }
      }
    };

    void loadTerm();
    return () => {
      isCancelled = true;
    };
  }, [type]);

  const visibleErrorMessage = isAuthTermType(type)
    ? errorMessage
    : '올바르지 않은 약관입니다.';
  const pageTitle = term?.title ?? '약관';

  return (
    <main className="min-h-dvh bg-white pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em] text-gray-100">
      <Header showBack title={pageTitle} />

      <section className="px-[25px] pb-[60px] pt-[39px]">
        {!term && !visibleErrorMessage && (
          <p className="text-center text-body-02 font-regular text-gray-60">
            약관을 불러오는 중입니다.
          </p>
        )}
        {visibleErrorMessage && (
          <p className="text-center text-body-02 font-regular text-primary-60">
            {visibleErrorMessage}
          </p>
        )}
        {term && (
          <article className="w-full break-words text-[10px] font-regular leading-normal text-black">
            {renderTermContent(term.content)}
          </article>
        )}
      </section>
    </main>
  );
}
