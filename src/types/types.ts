export type Movie = {

    id: string,
    title: string,
    averageReview: string,
    company: string,
}

export type MovieApiReuslt = {

    id: string,
    reviews: number[],
    title: string,
    filmCompanyId: string,
    cost: number,
    releaseYear: number
}

export type CompanyApiReuslt = {
    id: number,
    name: string
}
