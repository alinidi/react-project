'use client';

import { useLocale, useTranslations } from 'use-intl';
import s from './About.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';

export const About = () => {
  const t = useTranslations('About');

  const locale = useLocale();
  const path = usePathname();
  const router = useRouter();

  const switcher = locale === 'en' ? 'ru' : 'en';

  const handleLocale = () => {
    const part = path.split('/')[2];
    const newPath = '/' + switcher + '/' + part;
    router.push(newPath);
  };

  return (
    <div className={s.aboutWrapper} data-testid="about">
      <h1>{t('heading')}</h1>
      <div className={s.aboutStack}>
        <div className={s.about}>
          <p className={s.title}>{t('aboutTitle')}</p>
          <p className={s.text}>{t('aboutText')}</p>
        </div>
        <div className={s.technologiesWrapper}>
          <p className={s.title}>{t('techTitle')}</p>
          <ul className={s.list}>
            <li>React</li>
            <li>Typescript</li>
            <li>React Router</li>
            <li>Art Institute of Chicago API</li>
          </ul>
        </div>
      </div>
      <div className={s.aboutMe}>
        <p className={s.title}>{t('authorTitle')}</p>
        <p className={s.text}>{t('authorText')}</p>
      </div>
      <div className={s.infoWrapper}>
        <p>{t('createdBy')}</p>
        <Languages
          className={s.locale}
          size={20}
          onClick={() => handleLocale()}
        />
        <div className={s.links}>
          <a href="https://rs.school/courses/reactjs">
            <img
              className={s.logo}
              src="https://rolling-scopes-school.github.io/taneros-JSFE2021Q3/christmas-task-game/assets/rs_school_js_grey.svg"
              alt="rss"
            />
          </a>
          <a href="https://github.com/alinidi">
            <img
              className={s.logo}
              src="https://icones.pro/wp-content/uploads/2021/06/icone-github-grise.png"
              alt="github"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
