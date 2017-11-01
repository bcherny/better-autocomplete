import * as React from 'react'
import { ListItem } from '../List/List'
import { Autocomplete, Props } from './Autocomplete'
import { KEYCODES } from '../../constants/KEYCODES'

type State = {
  selectedIndex: number
}

// pulled out for VSCode code highlighting
type SomeAutoComplete = React.ComponentClass<Props>

let WithKeyboard = (Autocomplete: SomeAutoComplete) =>
  class extends React.Component<Props, State> {
    state: State = {
      selectedIndex: -1
    }

    render() {
      return <Autocomplete
        {...this.props}
        onKeyDown={this.onKeyDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        selectedItem={this.props.items[this.state.selectedIndex]}
      />
    }

    onMouseEnter = (item: ListItem) =>
      this.setState({
        selectedIndex: this.props.items.indexOf(item)
      })

    onMouseLeave = (item: ListItem) =>
      this.setState({
        selectedIndex: this.props.items.indexOf(item)
      })

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

      let MIN_INDEX = -1
      let MAX_INDEX = this.props.items.length - 1
      let currentIndex = this.state.selectedIndex

      switch (event.keyCode) {
        case KEYCODES.ARROW_DOWN:
          event.preventDefault()
          if (currentIndex < MAX_INDEX) {
            this.setState({ selectedIndex: currentIndex + 1 })
          }
          break
        case KEYCODES.ARROW_UP:
          event.preventDefault()
          if (currentIndex > MIN_INDEX) {
            this.setState({ selectedIndex: currentIndex - 1 })
          }
          break
        case KEYCODES.ENTER:
          event.preventDefault()
          let item = this.props.items[currentIndex]
          this.props.onChange({ item, value: item.name })
          break
        case KEYCODES.ESC:
          // TODO
      }
    }

  }

export let AutocompleteWithKeyboard = WithKeyboard(Autocomplete)
