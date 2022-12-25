import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils"

interface MessageNextApiRequest extends NextApiRequest {
    query: {
        message?:string
    }
}

export default function echo(req: NextApiRequest, res: NextApiResponse) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    
    // обработка данных, отправляемых пользователем
    res.end(JSON.stringify({
        message: req.query.message ?? 'Base message'
    }))
}