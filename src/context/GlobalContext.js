import { createContext, useReducer, useEffect } from 'react'
import Reducer from './Reducer'

const GlobalContext = createContext()

// load theme from local storage
const getPageTheme = () => {
  let pageTheme = localStorage.getItem('page-theme')
  if (!pageTheme) return 'dark-theme'
  else {
    if (document.body.classList.value === 'dark-theme') {
      document.body.classList.remove('dark-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
    document.body.classList.add(pageTheme)
    return pageTheme
  }
}

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    theme: getPageTheme(),
    allCountries: [],
    countries: [],
    country: [],
    loading: false,
    notFound: false,
    inputVal: '',
    filterVal: '',
    inputSelected: false,
    filterSelected: false,
  }

  const [state, dispatch] = useReducer(Reducer, initialState)

  // sets local storage theme, when theme is toggled
  useEffect(() => {
    localStorage.setItem('page-theme', state.theme)
    if (document.body.classList.value === 'dark-theme') {
      document.body.classList.remove('dark-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
    document.body.classList.add(state.theme)
  }, [state.theme])

  // toggles the theme
  const toggleTheme = () => {
    dispatch({
      type: 'TOGGLE_THEME',
      payload: state.theme === 'dark-theme' ? 'light-theme' : 'dark-theme',
    })
  }

  // sets loading to true
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' })
  }

  // get all counties
  const getAllCountries = async () => {
    if (state.allCountries.length === 0) {
      setLoading()
      const response = await fetch('https://restcountries.com/v3.1/all')
      const data = await response.json()
      dispatch({ type: 'GET_ALL_COUNTRIES', payload: data })
    } else if (state.inputVal !== '' || state.filterval !== '') {
      dispatch({
        type: 'RESTORE_HOME',
        payload: {
          countries: state.countries,
          inputSelected: state.inputSelected,
          filterSelected: state.filterSelected,
          inputVal: state.inputVal,
          filterVal: state.filterVal,
        },
      })
    } else {
      dispatch({ type: 'GET_ALL_COUNTRIES', payload: state.allCountries })
    }
  }

  // get user search results
  const getSearchedResults = (country_name) => {
    if (!country_name || country_name === '') {
      dispatch({ type: 'SEARCH_RESULTS', payload: state.allCountries })
    } else {
      let newCountries = []
      let flag = false
      for (let i = 0; i < state.allCountries.length; i++) {
        if (
          state.allCountries[i].name.common
            .toUpperCase()
            .includes(country_name.toUpperCase())
        ) {
          flag = true
          newCountries.push(state.allCountries[i])
        }
      }
      if (flag) dispatch({ type: 'SEARCH_RESULTS', payload: newCountries })
      else dispatch({ type: 'NOT_FOUND' })
    }
  }

  // get filtered results
  const getFilteredResults = (region) => {
    let newCountries = []
    for (let i = 0; i < state.allCountries.length; i++) {
      if (state.allCountries[i].region.toUpperCase() === region.toUpperCase()) {
        newCountries.push(state.allCountries[i])
      }
    }
    dispatch({ type: 'FILTERED_RESULTS', payload: newCountries })
  }

  // set input selected (so that filter value is '', when input selected)
  const setInput = (val) => {
    dispatch({ type: 'SET_INPUT', payload: val })
  }

  // set filter selected (so that input value is '', when filter selected)
  const setFilter = (val) => {
    dispatch({ type: 'SET_FILTER', payload: val })
  }

  // get country info
  const getCountry = async (name) => {
    setLoading()
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    )
    if (!response.ok) window.location = '/notfound'
    const data = await response.json()
    dispatch({
      type: 'GET_COUNTRY',
      payload: data,
    })
  }

  // return full country name from alt spelling
  const getName = (alt) => {
    for (let i = 0; i < state.allCountries.length; i++) {
      if (state.allCountries[i].cca3 === alt)
        return state.allCountries[i].name.common
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        theme: state.theme,
        countries: state.countries,
        country: state.country,
        loading: state.loading,
        notFound: state.notFound,
        toggleTheme,
        getAllCountries,
        getSearchedResults,
        getFilteredResults,
        getCountry,
        inputSelected: state.inputSelected,
        inputVal: state.inputVal,
        filterVal: state.filterVal,
        setInput,
        filterSelected: state.filterSelected,
        setFilter,
        getName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
