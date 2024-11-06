export type Movie = {

    id: string,
    reviews: number[],
    title: string,
    filmCompanyId: string,
    cost: number,
    releaseYear: number
}

export type Company = {
    id: number,
    name: string
}
