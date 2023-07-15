// hash payload for duplicate check
// and since we doing the hashing in the browser, then there's no point in adding
// some secret key to the hash, so we can just use the hash as the key
const hashMe = async (data) => {
  const msgUint8 = new TextEncoder().encode(data) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  return hashHex
}

export const parseLogs = async (logs, custom) => {
  const hash = await hashMe(logs)
  const entries = custom
    ? logs
        .replace(/\r/g, '')
        .replace(/\[\d\d:\d\d:\d\d\] /g, '')
        .split('\n')
        .map((str) => [str, ''])
    : logs
        .replace(/\r/g, '')
        .replace(/\[\d\d:\d\d:\d\d\] /g, '')
        .split('\n\n')
        .map((str) => str.split('\n'))

  const playerObject = entries.reduce((val, n) => {
    const [line1] = n
    // parse guild and player details from the first line
    const [attacker, target] = (
      custom
        ? line1.replace(/(guild master|defender) /gi, '').split(/\skilled\s/i)
        : line1.replace(/(guild master|defender) /gi, '').split(/\sattack\s/i)
    ).map((str) => {
      if (!str) return
      const guild = str.match(/\[.+\]/gi)[0].replace(/[\[\]]/g, '')
      const player = str
        .replace(/\d? grade.+$/g, '')
        .replace(/ for \d points/gi, '')
        .match(/\] .+(\(|$)/gi)[0]
        .replace(/[\]\(]/g, '')
        .trim()
      return [guild.trim(), player.trim()]
    })
    // if private server, then points is always 2
    const points = custom
      ? parseInt((line1.match(/for \d points/) || [])[0]?.split(' ')[1] || '2')
      : parseInt((line1.match(/\d grade/) || [])[0]?.split(' ')[0] || '2')

    // attacker and target data should not be empty or null
    if (!attacker || !target) return val

    const [guild, name] = attacker
    const [tarGuild, targetIgn] = target

    // init defaults
    if (!val[name]) {
      val[name] = { kills: [[]], deaths: [], guild, points: 0 }
    }
    if (!val[targetIgn]) {
      val[targetIgn] = {
        kills: [[]],
        deaths: [],
        guild: tarGuild,
        points: 0,
      }
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

  const maxLives = Math.max(
    players.reduce((v, p) => Math.max(v, p.deaths.length), 0),
  )

  const guildObj = players.reduce((v, p) => {
    if (!v[p.guild]) {
      v[p.guild] = {
        name: p.guild,
        points: 0,
        kills: 0,
        resu: 0,
        players: [],
      }
    }
    v[p.guild].name = p.guild
    v[p.guild].points += p.points
    v[p.guild].kills += p.kills.reduce((v, k) => {
      return [...v, ...k]
    }).length
    const resu = maxLives - p.deaths.length
    v[p.guild].resu += resu
    v[p.guild].players.push({
      name: p.name,
      points: p.points,
      resu,
    })
    v[p.guild].players.sort((a, b) => b.points - a.points)
    // side effects
    const pidx = players.indexOf(players.find((pl) => pl.name === p.name))
    players[pidx].resu = resu
    return v
  }, {})

  const guilds = Object.keys(guildObj)
    .map((k) => {
      return guildObj[k]
    })
    .sort((a, b) => b.points - a.points)

  return { guilds, players, hash }
}
