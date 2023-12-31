import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import s from './error-page.module.scss';
import error404 from './404.svg';

export const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <div className={s.errorPage}>
        <img src={error404} alt={'404'} className={s.error404} />
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={s.errorPage}>
        <img src={error404} alt={'404'} className={s.error404} />
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
};
