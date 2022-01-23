const Reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'GET_ALL_COUNTRIES':
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
        loading: false,
        notFound: false,
      }
    case 'SEARCH_RESULTS':
      return {
        ...state,
        countries: action.payload,
        notFound: false,
      }
    case 'NOT_FOUND':
      return {
        ...state,
        countries: [],
        notFound: true,
      }
    case 'FILTERED_RESULTS':
      return {
        ...state,
        countries: action.payload,
        notFound: false,
      }
    case 'SET_INPUT':
      return {
        ...state,
        inputSelected: true,
        filterSelected: false,
        inputVal: action.payload,
      }
    case 'SET_FILTER':
      return {
        ...state,
        inputSelected: false,
        filterSelected: true,
        filterVal: action.payload,
      }
    case 'GET_COUNTRY':
      return {
        ...state,
        country: action.payload,
        loading: false,
        notFound: false,
      }
    case 'RESTORE_HOME':
      return {
        ...state,
        countries: action.payload.countries,
        inputSelected: action.payload.inputSelected,
        filterSelected: action.payload.filterSelected,
        inputVal: action.payload.inputVal,
        filterVal: action.payload.filterVal,
      }
    default:
      return state
  }
}

export default Reducer
