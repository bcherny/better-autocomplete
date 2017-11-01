import * as classnames from 'classnames'
import * as React from 'react'
import './List.css'

export type ListItem<Data = {}> = {
  data: Data
  id: string
  name: string
}

interface Props {
  items: ListItem[]
  onClick?(item: ListItem): any
  onMouseEnter?(item: ListItem): any
  onMouseLeave?(item: ListItem): any
  selectedItem?: ListItem
  Template: React.StatelessComponent<ListItem>
}

// nb: uses onMouseDown instead of onClick to keep the popover visible
// in autocomplete, otherwise it hides because the input loses focus on click
export let List: React.StatelessComponent<Props> = ({
  items, selectedItem, onClick, onMouseEnter, onMouseLeave, Template
}) =>
  <ul className='List'>
    {items.map(_ =>
      <li
        className={classnames('ellipsis', {
          'is-selected': selectedItem && selectedItem.id === _.id
        })}
        key={_.id}
        onMouseDown={() => onClick && onClick(_)}
        onMouseEnter={() => onMouseEnter && onMouseEnter(_)}
        onMouseLeave={() => onMouseLeave && onMouseLeave(_)}
      ><Template data={_.data} id={_.id} name={_.name} /></li>)
    }
  </ul>
