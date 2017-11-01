import * as classnames from 'classnames'
import * as React from 'react'
import { List, ListItem } from '../List/List'
import { Popover } from '../Popover/Popover'
import './Autocomplete.css'

export type Props = {
  autoFocus?: boolean
  items: ListItem[]
  isDisabled?: boolean
  onBlur?(value: Value): any
  onChange(value: Value): any
  onClick?(e: React.MouseEvent<HTMLInputElement>): any
  onFocus?(): any
  /** Invoked async */
  onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): any
  onKeyUp?(e: React.KeyboardEvent<HTMLInputElement>): any
  onMouseEnter?(item: ListItem): any
  onMouseLeave?(item: ListItem): any
  onRender?(input: Element): void
  placeholder?: string
  selectedItem?: ListItem // for keyboard selection
  value: Value
}

interface State {
  input: HTMLInputElement | null
}

export interface Value {
  item: ListItem | null
  value: string
}

export class Autocomplete extends React.Component<Props, State> {
  state: State = {
    input: null
  }

  isPopoverOpen(): boolean {
    return document.activeElement === this.state.input
      && this.props.items.length > 0
      && !this.props.value.item // TODO: make sure this condition actually works in all cases
  }

  ref = (input: HTMLInputElement) => {
    if (this.state.input) {
      return
    }
    this.setState({ input })
  }

  render() {

    const ListItem: React.StatelessComponent<ListItem> = (props: ListItem) =>
      <span>{props.name}</span>

    return <div>
      <input
        autoComplete='false'
        className={classnames('Input', { 'has-menu-below': this.isPopoverOpen() })}
        type='text'
        onBlur={() => this.props.onBlur && this.props.onBlur(this.props.value)}
        onChange={this._onChange}
        onFocus={this.props.onFocus}
        onKeyDown={this.onKeyDown}
        ref={this.ref}
        value={this.props.value ? this.props.value.value : ''}
      />
      <Popover
        isOpen={this.isPopoverOpen()}
        tetherTo={this.state.input!}
        >
        <List
          items={this.props.items}
          onClick={this.onClick}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
          selectedItem={this.props.selectedItem}
          Template={ListItem}
        />
      </Popover>
    </div>
  }

  onChange(value: string) {
    this.props.onChange({
      item: null,
      value
    })
  }
  _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // smooth typing
    // TODO: make sure this works in all cases
    let { value } = e.currentTarget
    setTimeout(() => this.onChange(value))
  }

  onClick = (item: ListItem) => {
    this.props.onChange({
      item,
      value: item.name
    })
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // smooth typing
    // TODO: make sure this works in all cases
    e.persist()
    setTimeout(() => this.props.onKeyDown && this.props.onKeyDown(e))
  }

}
