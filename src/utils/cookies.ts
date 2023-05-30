const setCookie = ({
  name,
  value,
  days,
}: {
  name: string;
  value: boolean | string | number;
  days: number;
}) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieValue = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return null;
};

const hasAcceptedCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accept-cookies"));
  return cookie?.split("=")[1] === "true";
};

const deleteCookie = (name: string) => {
  const deletionDate = new Date("2000-01-01");
  const cookieValue = `${name}=; expires=${deletionDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

export { setCookie, getCookie, hasAcceptedCookies, deleteCookie };
