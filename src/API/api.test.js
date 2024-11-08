import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCompanies, getMovies, submitReview } from './api';

global.fetch = vi.fn()

const mockFetchResponse = (data) => {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

const mockFetcherror = () => {
  throw "error"
}

describe('getMovies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getMovies returns film list on sucessful call', async () => {
    const mockResultTata = ["test movie"]

    fetch.mockResolvedValue(mockFetchResponse(mockResultTata))

    let result = await getMovies()

    expect(result).toEqual(mockResultTata)

  });


  it('getMovies returns null on unsucessful call', async () => {
    fetch.mockRejectedValue(new Error('Async error'))

    let result = await getMovies()

    expect(result).toEqual(null)

  });
});



describe('getCompanies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getCompanies returns film list on sucessful call', async () => {
    const mockResultTata = ["test company"]

    fetch.mockResolvedValue(mockFetchResponse(mockResultTata))

    let result = await getCompanies()

    expect(result).toEqual(mockResultTata)

  });


  it('getCompanies returns null on unsucessful call', async () => {
    fetch.mockRejectedValue(new Error('Async error'))

    let result = await getCompanies()

    expect(result).toEqual(null)

  });
});

describe('submitReview', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('submitReview returns api message on sucessful call', async () => {
    const mockResultTata = {message: "test response"}

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