import { query as q } from 'faunadb'
import { faunaClient } from '../../helpers/fauna'

// eslint-disable-next-line
export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const logs = JSON.parse(req.body)

  try {
    await faunaClient.query(
      q.Create(q.Collection('logs'), {
        data: logs,
      }),
    )
    res.status(200).json({
      status: 'success',
    })
  } catch (e) {
    res.status(400).json({
      error: e.message,
    })
  }
}
