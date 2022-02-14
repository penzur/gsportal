import { query as q } from 'faunadb'
import { faunaClient } from '../../helpers/fauna'

// eslint-disable-next-line
export default async (req, res) => {
  const { date = 0, server = '' } = req.query

  if (req.method == 'GET') {
    let query = await faunaClient.query(
      q.Get(q.Match('logs_by_server_and_date', server, parseInt(date))),
    )
    res.status(200).json(query.data)
  }
}
