import * as classnames from 'classnames'
import * as React from 'react'
import './Popover.css'

type Props = {
  isOpen: boolean
  tetherTo: HTMLElement
}

export let Popover: React.StatelessComponent<Props> = ({ children, isOpen, tetherTo }) =>
  <div
    className={classnames('Popover', { 'is-open': isOpen })}
    onClick={e => e.stopPropagation()}
    style={{
      width: tetherTo.getBoundingClientRect().width
    }}
  >{children}</div>
