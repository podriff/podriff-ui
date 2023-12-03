export function pxToRem(
  px: number | string,
  baseFontSize: number = 16
): string {
  if (typeof px === "string") {
    const parsedPx = Number(px.replace("px", ""));
    if (isNaN(parsedPx)) {
      px = 1;
    }
    px = parsedPx;
  }

  return `${px / baseFontSize}rem`;
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,15}$/;
  return emailRegex.test(email);
}

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: string, requestOptions?: RequestInit) {
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", 'Accept': 'application/json', ...requestOptions?.headers },
    ...requestOptions,
  }).then(handleResponse);
}

async function post(url: string, requestOptions: RequestInit) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", 'Accept': 'application/json', ...requestOptions?.headers },
    ...requestOptions,
  }).then(handleResponse);
}

async function put(url: string, requestOptions?: RequestInit) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", 'Accept': 'application/json', ...requestOptions?.headers },
    ...requestOptions,
  }).then(handleResponse);
}

async function _delete(url: string, requestOptions?: RequestInit) {
  return fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", 'Accept': 'application/json', ...requestOptions?.headers },
    ...requestOptions,
  }).then(handleResponse);
}

async function handleResponse(response: Response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
}

export * from './constants';
