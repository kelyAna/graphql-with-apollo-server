export const cookieParser = (cookiesHeader) => {
  if (typeof cookiesHeader != 'string') return {}

  const cookies = cookiesHeader.split(/;\s*/)

  const parsedCookie = {}
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=')
    parsedCookie[key] = value
  }

  return JSON.parse(JSON.stringify(parsedCookie))
}
