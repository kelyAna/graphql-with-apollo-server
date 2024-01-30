export const userExists = async (userName: string, dataSource) => {
  const userFound = await dataSource.get('', {
    userName
  })

  return userFound[0]
}