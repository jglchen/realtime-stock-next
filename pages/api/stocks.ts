import { stocks } from '@/lib/stocks';
import type { NextApiRequest, NextApiResponse } from 'next';
import { QuoteData } from '@/lib/types';

interface StocksResponse {
    success: boolean;
    data: QuoteData[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<StocksResponse>) {
    res.status(200).json({ success: true, data: stocks });
}
