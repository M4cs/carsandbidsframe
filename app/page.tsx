import type { Metadata } from 'next';
import { getFrameMetadata } from '@coinbase/onchainkit';


const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Find an Auction',
      action: 'post'
    }
  ],
  image: 'https://carsandbidsframe.vercel.app/FirstFrame.png',
  postUrl: 'https://carsandbidsframe.vercel.app/api/frame'
});

export const metadata: Metadata = {
  title: 'Cars and Bids Frame',
  description: 'Find a random Cars and Bids Auction!',
  openGraph: {
    images: [
      'https://carsandbidsframe.vercel.app/FirstFrame.png
    ],
    title: 'Cars and Bids Frame',
    description: 'Find a random Cars and Bids Auction!',
  },
  other: {
    ...frameMetadata
  }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Cars and Bids and Bids and Cars and More Cars and MOre BIds!</p>
    </main>
  );
}
