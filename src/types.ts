export interface Book {
  id: string
  title: string
  author: string
  description?: string
  rating: number
  year: number
}

export interface Books {
  allBooks: Book[]
}
