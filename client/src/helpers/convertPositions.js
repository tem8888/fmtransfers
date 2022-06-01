const convertPositions = (positions) => {
    const arr = positions.replace(/ /g,'').split(',')
    const result = []
    const regexp_pos = /.+?(?=\()|.+/g
    const regexp_sides = /(?<=\().+?(?=\))/g
    
    arr.forEach(pos => {
        let position = pos.match(regexp_pos)[0]
        
        if (position.indexOf('/') === -1) {
            let sides = pos.match(regexp_sides)
        if (sides)
            sides[0].split('').forEach(side => {
                result.push(position + side)
            })
        else
            result.push(position)
        } else {
            position.split('/').forEach(tpos => {
            let sides = pos.match(regexp_sides)
            if (sides)
                sides[0].split('').forEach(side => {
                result.push(tpos+side)
            })
        })
        }
    })
    return result
}

export default convertPositions