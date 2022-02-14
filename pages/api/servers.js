import { query as q } from 'faunadb'
import { faunaClient } from '../../helpers/fauna'

// eslint-disable-next-line
export default async (req, res) => {
  if (req.method == 'GET') {
    let query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('servers'))),
        q.Lambda((server) => q.Get(server)),
      ),
    )
    res.status(200).json(query.data)
  }
}
