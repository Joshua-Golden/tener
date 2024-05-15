import React from 'react'
import clsx from 'clsx'
import { Check } from 'lucide-react'

interface TagComponentProps {
  title: string
  colorName: string
  selectedColor?: string
  setSelectedColor?: (color: string) => void
}

const TagComponent: React.FC<TagComponentProps> = ({
  colorName,
  title,
  setSelectedColor,
  selectedColor
}) => {
  console.log(selectedColor)
  return (
    <div
      className={clsx('p-2 rounded-sm flex-shrink-0 text-xs cursor-pointer', {
        'bg-[#57acea]/10 text-[#57acea]': colorName === 'BLUE',
        'bg-[#ffac7e]/10 text-[#ffac7e]': colorName === 'ORANGE',
        'bg-rose-500/10 text-rose-500': colorName === 'ROSE',
        'bg-emerald-400/10 text-emerald-400': colorName === 'GREEN',
        'bg-purple-400/10 text-purple-400': colorName === 'PURPLE',
        'bg-[#57acea]': colorName === 'BLUE' && !title && colorName === selectedColor,
        'bg-[#ffac7e]': colorName === 'ORANGE' && !title && colorName === selectedColor,
        'bg-rose-500': colorName === 'ROSE' && !title && colorName === selectedColor,
        'bg-emerald-400': colorName === 'GREEN' && !title && colorName === selectedColor,
        'bg-purple-400': colorName === 'PURPLE' && !title && colorName === selectedColor,
        'border-[1px] border-[#57acea]': colorName === 'BLUE' && !title,
        'border-[1px] border-[#ffac7e]': colorName === 'ORANGE' && !title,
        'border-[1px] border-rose-500': colorName === 'ROSE' && !title,
        'border-[1px] border-emerald-400': colorName === 'GREEN' && !title,
        'border-[1px] border-purple-400': colorName === 'PURPLE' && !title,
      })}
      key={colorName} 
      onClick={() => {
        if (setSelectedColor) {
          setSelectedColor(colorName);
        }
      }}
    >
      {title}
    </div>
  )
}

export default TagComponent