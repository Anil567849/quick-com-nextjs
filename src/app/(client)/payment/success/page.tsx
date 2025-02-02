
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '../../_components/header';

export default function SuccessPage() {
    return (
        <>
            <Header />
            <section className="custom-height relative bg-[#f5f5f5]">
                <div className="z-50 mx-auto flex h-full max-w-6xl items-center justify-center gap-x-10 px-5 py-14 md:py-20">
                    <Card className="flex flex-col items-center justify-center gap-y-3 rounded border-none p-5 shadow-xl md:w-2/5">
                        <CircleCheck className="size-40 text-white" fill="#4ade80" />
                        <h3 className="text-4xl font-bold">Payment Done!</h3>
                        <span className="text-center">
                            Thank you for completing your secure online payment.
                        </span>
                        <span>Have a great day!</span>
                        <Link href="/">
                            <Button className="mt-5">Go back</Button>
                        </Link>
                    </Card>
                </div>
            </section>
        </>
    );
}