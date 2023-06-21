import { query as q } from 'faunadb'
import { faunaClient } from '../../helpers/fauna'

// eslint-disable-next-line
export default async (req, res) => {
  if (req.method == 'GET') {
    try {
      let query = await faunaClient.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('logs')), { size: 100000 }),
          q.Lambda((log) => q.Get(log)),
        ),
      )
      res.status(200).json(
        JSON.stringify(
          query.data.map(({ data: { server, date, guilds, players } }) => ({
            server,
            date,
            winner: guilds.sort((a, b) => {
              if (a.points + a.resu > b.points + b.resu) return -1
              return 1
            })[0]?.name,
            mvp: players[0]?.name,
          })),
        ),
      )
    } catch (error) {
      res.status(400).json(JSON.stringify({ error: error.message }))
    }
  }
}
