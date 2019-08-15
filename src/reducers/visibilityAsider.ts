const visibilityAsider = (state = false, action: { type: any; collapsed: any; }) => {
  switch (action.type) {
    case 'SET_VISIBILITY_ASIDER':
      return action.collapsed
    default:
      return state
  }
}

export default visibilityAsider