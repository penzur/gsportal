import { query as q } from 'faunadb'
import { faunaClient } from '../../helpers/fauna'

// eslint-disable-next-line
export default async (req, res) => {
  const { date = 0, server = '' } = req.query

  if (req.method == 'GET') {
    try {
      let query = await faunaClient.query(
        q.Get(q.Match('logs_by_server_and_date', server, parseInt(date))),
      )
      res.status(200).json(JSON.stringify(query.data))
    } catch (e) {
      res.status(400).json(
        JSON.stringify({
          error: e.message,
        }),
      )
    }
  }
}
