import { defineStore } from 'pinia'
import axiosInstance from 'services/axios'

export interface BookedSeats {
  row: number
  place: number
  price: number
}

export interface MoviesData {
  id: number
  title: string
  poster: string
  rating: string
  description: string
  overview: string
  session_place: string
  session_date: string
  session_time: string[]
}

interface MoviesState {
  movies: MoviesData[]
  isLoading: boolean
  bookedSeats: BookedSeats[]
}

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    movies: [],
    isLoading: false,
    bookedSeats: []
  }),
  getters: {},
  actions: {
    async fetchMovies() {
      try {
        this.isLoading = true
        const response = await axiosInstance.get<MoviesData[]>('/movies')

        this.movies = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
