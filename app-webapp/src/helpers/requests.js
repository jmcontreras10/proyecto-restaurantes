const backUrl = "http://localhost:3500/api";

const headers = [
  {
    "Content-Type": "application/json"
  },
];

const methods = ["GET", "POST"];

const requestSome = async (path, method, headerType, body) => {
  let requestOptions = {
    method: methods[method],
    headers: headers[headerType],
  };
  if (body) requestOptions.body = JSON.stringify(body);
  const response = await fetch(`${backUrl}/${path}/`, requestOptions);
  const data = await response.json();
  return data;
};

export { requestSome };
