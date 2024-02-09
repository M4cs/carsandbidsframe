import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


async function getResponse(req: NextRequest) {

    const body: FrameRequest = await req.json();
}

export async function POST(req: NextRequest) {
    const body: FrameRequest = await req.json();

    const seed = req.nextUrl.searchParams.get('seed');

    if (body.untrustedData.buttonIndex == 2) {
        const prev = req.nextUrl.searchParams.get('prev');

        if (!prev) {
            return new NextResponse(getFrameHtmlResponse({
                buttons: [
                    {
                        label: 'Next Car',
                        action: 'post'
                    }
                ],
                image: 'https://carsandbidsframe.vercel.app/FirstFrame.png',
                postUrl: 'https://carsandbidsframe.vercel.app/api/frame'
            }));
        }

        return NextResponse.redirect(`https://carsandbids.com/auctions/${prev}`, { status: 302 });
    }

    if (!seed) {
        const res = await axios.get(
            `https://carsandbids.com/v2/autos/auctions?sort=1&timestamp=1707506444729&signature=8b35dc495261eb1cd53469bb573d0235be028cab`
        );
        const data = res.data;
        const auctions = data.auctions;
        const curr = Math.floor(Math.random() * auctions.length);
        const next = Math.floor(Math.random() * auctions.length);
        const auction = auctions[curr];
        const imageUrl = 'https://' + auction.main_photo.base_url + '/' + auction.main_photo.path;
        return new NextResponse(getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Next Car',
                    action: 'post',
                },
                {
                    label: 'View Auction',
                    action: 'post_redirect'
                }
            ],
            image: imageUrl,
            postUrl: `https://carsandbidsframe.vercel.app/api/frame?prev=${auction.id}&seed=${next}`
        }));
    }

    if (seed) {
        const res = await axios.get(
            `https://carsandbids.com/v2/autos/auctions?sort=1&timestamp=1707506444729&signature=8b35dc495261eb1cd53469bb573d0235be028cab`
        );
        const data = res.data;
        const auctions = data.auctions;
        const next = Math.floor(Math.random() * auctions.length);
        const auction = auctions[parseInt(seed)];
        const imageUrl = 'https://' + auction.main_photo.base_url + '/' + auction.main_photo.path;
        return new NextResponse(getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Next Car',
                    action: 'post',
                },
                {
                    label: 'View Auction',
                    action: 'post_redirect'
                }
            ],
            image: imageUrl,
            postUrl: `https://carsandbidsframe.vercel.app/api/frame?prev=${auction.id}&seed=${next}`
        }));
    }

    return new NextResponse(getFrameHtmlResponse({
        buttons: [
            {
                label: 'Next Car',
                action: 'post'
            }
        ],
        image: 'https://carsandbidsframe.vercel.app/FirstFrame.png',
        postUrl: 'https://carsandbidsframe.vercel.app/api/frame'
    }));
}