export const parseLogs = (logs) => {
  const playerObject = logs
    .replace(/\r/g, '')
    .split('\n\n')
    .map((str) => str.split('\n'))
    .reduce((val, n) => {
      const [line1, line2] = n
      // parse guild and player details from the first line
      const [attacker, target] = line1
        .split(/\sattack\s[^\w]+\s/i)
        .map((str) => {
          const chunks = str.replace(/\(.+\)/i, '').split(' ')
          const guild = chunks[0].replace(/[\[\]]/g, '')
          const player = chunks[chunks.length - 1]
          return [guild, player]
        })

      // parse points from line 2
      if (!line2) return val
      const points = line2
        .replace(/[<>]/g, '')
        .split(',')
        .map((p) => {
          return parseInt(p.trim().replace(/[^\d]/gi, ''))
        })
        .reduce((val, p) => val + p, 0)

      // attacker and target data should not be empty or null
      if (!attacker || !target) return val

      const [guild, name] = attacker
      const [tarGuild, targetIgn] = target

      // init defaults
      if (!val[name]) {
        val[name] = { kills: [[]], deaths: [], guild, points: 0 }
      }
      if (!val[targetIgn]) {
        val[targetIgn] = { kills: [[]], deaths: [], guild: tarGuild, points: 0 }
      }

      // ATTACKER
      // current life
      const life = val[name].deaths.length
      val[name].kills[life].push({
        guild: tarGuild,
        name: targetIgn,
        points,
      })
      val[name].points += points

      // TARGET
      val[targetIgn].deaths.push({ guild: guild, name: name })
      // move to next life
      val[targetIgn].kills.push([])

      return val
    }, {})

  const players = Object.keys(playerObject)
    .map((k) => {
      const player = playerObject[k]
      return {
        name: k,
        guild: player.guild,
        points: player.points,
        kills: player.kills,
        deaths: player.deaths,
      }
    })
    .sort((a, b) => b.points - a.points)

  const guildObj = players.reduce((v, p) => {
    if (!v[p.guild]) {
      v[p.guild] = {
        name: p.guild,
        points: 0,
        kills: 0,
        players: [],
      }
    }
    v[p.guild].name = p.guild
    v[p.guild].points += p.points
    v[p.guild].kills += p.kills.reduce((v, k) => {
      return [...v, ...k]
    }).length
    v[p.guild].players.push({
      name: p.name,
      points: p.points,
    })
    v[p.guild].players.sort((a, b) => b.points - a.points)

    return v
  }, {})
  const guilds = Object.keys(guildObj)
    .map((k) => {
      return guildObj[k]
    })
    .sort((a, b) => b.points - a.points)

  return { guilds, players }
}
