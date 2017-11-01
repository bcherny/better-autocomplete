import * as classnames from 'classnames'
import * as React from 'react'

type Props = {
  isVisible: boolean
}

export let Loader: React.StatelessComponent<Props> = ({ isVisible }) =>
  <div className={classnames('Loader fade', { 'is-visible': isVisible })} />
