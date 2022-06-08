import React from 'react'

const PlayerSkillRow = ({playerInfo, attr}) => {
  return (
    <tr>
        <td className="table-skill-name">{attr.name}</td>
        <td 
            className="table-skill-value"
            style={{ color: 
                playerInfo[attr.id] > 15 ? 'var(--excel)' : 
                playerInfo[attr.id] > 10 ? 'var(--good)' :
                playerInfo[attr.id] > 5 ? 'var(--badly)' : 'var(--bad)'
            }}
        >
            {playerInfo[attr.id]}
        </td>
    </tr>
  )
}

export default PlayerSkillRow