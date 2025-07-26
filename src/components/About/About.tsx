import s from './About.module.scss';

export const About = () => {
  return (
    <div className={s.aboutWrapper}>
      <h1>Art Institute of Chicago</h1>
      <div className={s.aboutStack}>
        <div className={s.about}>
          <p className={s.title}>About Application</p>
          <p className={s.text}>
            Art Institute of Chicago Explorer is a React application that allows
            users to search and browse artworks from the Art Institute of
            Chicago's public API. Users can view artwork details and navigate
            through paginated results
          </p>
        </div>
        <div className={s.technologiesWrapper}>
          <p className={s.title}>Technologies Used</p>
          <ul className={s.list}>
            <li>React</li>
            <li>Typescript</li>
            <li>React Router</li>
            <li>Art Institute of Chicago API</li>
          </ul>
        </div>
      </div>
      <div className={s.aboutMe}>
        <p className={s.title}>Author</p>
        <p className={s.text}>
          I am a student of the React course stage 3 at The Rolling Scopes
          School. Previously, I completed the JavaScript course also provided by
          RSS.
        </p>
      </div>
      <div className={s.infoWrapper}>
        <p>Created by Alina Iulbaeva</p>
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
