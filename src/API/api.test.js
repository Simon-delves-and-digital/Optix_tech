import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCompanies, getMovies, submitReview } from './api';

global.fetch = vi.fn()

const mockMovieData = [
  {
    id: 1,
    reviews: [2, 3, 4],
    title: "A test movie",
    filmCompanyId: 1,
    cost: 123,
    releaseYear: 321
  }
]

const mockCompanyData = [
  {
    id: 1,
    name: "Test Company"
  },
]



const mockFetchResponse = (data) => {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

const createFetchMock = (sucessful = true) => {
  return async (url) => {
    if (url === "http://localhost:3000/movies") {
      return Promise.resolve({
        json: () => Promise.resolve(mockMovieData)
      })
    }
    else {

      return sucessful ?
        Promise.resolve({
          json: () => Promise.resolve(mockCompanyData)
        })
        :
        Promise.resolve({
          json: () => Promise.resolve(new Error('Async error'))
        })

    }
  }
}

describe('getMovies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getMovies returns film list on sucessful call', async () => {
    const ExpectedResult = [{
      averageReview: "3.0",
      company: "Test Company",
      id: 1,
      title: "A test movie",
    }]
    fetch.mockImplementation(createFetchMock(true))


    let result = await getMovies()


    expect(result).toEqual(ExpectedResult)

  });

  it('getMovies returns film list with error text when filmCompany api request fails', async () => {
    const ExpectedResult = [{
      averageReview: "3.0",
      company: "--error retriving company data--",
      id: 1,
      title: "A test movie",
    }]
    fetch.mockImplementation(createFetchMock(false))


    let result = await getMovies()


    expect(result).toEqual(ExpectedResult)

  });


  it('getMovies returns null on unsucessful call', async () => {
    fetch.mockRejectedValue(new Error('Async error'))

    let result = await getMovies()

    expect(result).toEqual(null)

  });
});


describe('submitReview', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('submitReview returns api message on sucessful call', async () => {
    const mockResultTata = { message: "test response" }

    fetch.mockResolvedValue(mockFetchResponse(mockResultTata))

    let result = await submitReview()

    expect(result).toEqual(mockResultTata.message)

  });

  it('submitReview returns empty string on unsucessful call', async () => {
    fetch.mockRejectedValue(new Error('Async error'))

    let result = await submitReview()

    expect(result).toEqual("")

  });
});