import { query as q } from 'faunadb'
import { faunaClient } from '../../helpers/fauna'

const Log = async (req, res) => {
  const { date = 0, server = '' } = req.query

  if (req.method === 'GET') {
    try {
      let query = await faunaClient.query(
        q.Get(q.Match('logs_by_server_and_date', server, parseInt(date))),
      )
      const data = query.data
      data.guilds = data.guilds.sort((a, b) =>
        a.points + a.resu > b.points + b.resu ? -1 : 1,
      )
      res.status(200).json(JSON.stringify(data))
    } catch (e) {
      res.status(400).json(
        JSON.stringify({
          error: e.message,
        }),
      )
    }
  }
}

export default Log
