import { NextPage } from "next";

const Error = ({ statusCode }: any) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
      Sorry something happened
    </p>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  console.log(res, err);

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
