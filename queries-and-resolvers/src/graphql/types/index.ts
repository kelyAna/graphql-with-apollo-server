export type UserDataSource = {
  context: {
    dataSources: {
      userApi: {
        get: (userId: string) => Promise<any>
      }
    }
  }
}

export type PostInput = {
  title: string
  body: string
  userId: string
}