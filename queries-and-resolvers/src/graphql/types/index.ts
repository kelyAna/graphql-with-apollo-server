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

export type UserInput = {
  firstName: string
  lastName: string
  userName: string
}

interface Post {
  id: string
  title: string
  body: string
  user: number
  indexRef: number
  createdAt: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  userName: string
  indexRef: number
  createdAt: string
  posts: Post[]
}