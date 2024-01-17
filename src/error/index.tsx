import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
};

export default ErrorPage;
