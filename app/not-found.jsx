'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from '@/components/ui/button';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { RiErrorWarningFill } from '@remixicon/react';

export default function NotFound() {

    const pathname = usePathname()
    return (

        <div className="grid lg:grid-cols-1 grow">
            <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
                <div data-slot="card"
                    className="flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5 w-full max-w-[400px]">


                    <div data-slot="card-content" className="grow p-6 text-center">
                        <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold mb-2">Page Not Found!</h2>


                        <Alert size="sm" close={false} className="mb-2">
                            <AlertIcon>
                                <RiErrorWarningFill className="text-primary" />
                            </AlertIcon>
                            <AlertTitle className="text-accent-foreground">
                                Đường dẫn truy cập <span className="text-sm font-semibold text-red-500">{pathname}</span> chưa đúng.
                            </AlertTitle>
                        </Alert>


                        <Button asChild>
                            <Link href="/">Về trang chủ</Link>
                        </Button>

                    </div>


                </div>

            </div>
        </div>


    )
}