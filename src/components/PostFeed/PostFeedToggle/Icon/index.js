import React from 'react';
import icon from '../../../../assets/triangle.svg'
const Icon = props => {
  return (
    <div className="Icon" style={
      props.hidden ? (
        {
          transform: 'rotatez(180deg)'
        }
      ) : (
        {
          transform: 'rotatez(0deg)'
        }
      )
    }>
      <img src={icon} alt={
        props.hidden ? (
          "Show Feed"
        ) : (
          "Hide Feed"
        )
      }/>
    </div>
  )
}

export default Icon;