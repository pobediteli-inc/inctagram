import clsx from 'clsx'

import s from './progressBar.module.scss'

type Props = {
  className?: string
}

export const ProgressBar = ({ className }: Props) => {
  return <span className={clsx(className, s.loader)}></span>
}
