import * as React from 'react'
import { Value, Props as AutocompleteProps } from './Autocomplete'
import { AutocompleteWithKeyboard } from './WithKeyboard'
import { ListItem } from '../List/List'
import { Loader } from '../Loader/Loader'

type Props = AutocompleteProps & {
  fetch: Fetch
}

export type Fetch = (value: string) => Promise<ListItem[]>

interface State {
  isBlurred: boolean
  isFetching: boolean
  items: ListItem[]
}

// pulled out for VSCode code highlighting
type SomeAutoComplete = React.ComponentClass<AutocompleteProps>

let WithRemote = (Autocomplete: SomeAutoComplete) =>
  class extends React.Component<Props, State> {

  state: State = {
    isBlurred: true,
    isFetching: false,
    items: []
  }

  render() {
    return <div className='Autocomplete-Wrapper'>
      <Autocomplete
        field={this.props.field}
        items={this.state.items}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        shouldShowError={this.props.shouldShowError}
        value={this.props.value}
      />
      <Loader isVisible={this.state.isFetching} />
    </div>
  }

  pickFirst = () => {
    if (!this.props.value.item && this.state.items.length) {
      this.props.value.item = this.state.items[0]
      this.props.value.value = this.state.items[0].name
    }
  }

  onBlur = (value: Value) => {
    this.setState({ isBlurred: true })
    this.pickFirst()
    if (this.props.onBlur) {
      this.props.onBlur(value)
    }
  }

  onFocus = () => {
    this.setState({ isBlurred: false })
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  onChange = async ({item, value}: Value) => {

    this.props.onChange({item, value})

    // fetch to update items in <List>
    if (value.length) {
      this.setState({ isFetching: true })
      this.onFetch(value, await this.props.fetch(value))
    }

  }

  onFetch(value: string, items: ListItem[]) {
    // value might be stale by the time fetch is done
    if (value !== this.props.value.value) {
      return
    }
    this.setState({ isFetching: false, items })
    if (this.state.isBlurred) {
      this.pickFirst()
    }
  }
}

export let RemoteAutocomplete = WithRemote(AutocompleteWithKeyboard)
