import { NextApiRequest, NextApiResponse } from "../../../node_modules/next/dist/shared/lib/utils"

export default function getById(req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(req.query.id)

    // res.json({yourId: req.qery.id})
}