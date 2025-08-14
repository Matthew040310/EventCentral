import { NextRequest } from 'next/server'
import { handlers } from '@/auth'

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function rewriteRequest(request: NextRequest) {
    let { protocol, host, pathname } = request.nextUrl;

    const headers = request.headers
    // Host rewrite adopted from next-auth/packages/core/src/lib/utils/env.ts:createActionURL
    const detectedHost = headers.get("x-forwarded-host") ?? host
    const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol
    const _protocol = detectedProtocol.endsWith(":")
        ? detectedProtocol
        : detectedProtocol + ":";
    const url = new URL(`${_protocol}//${detectedHost}${APP_BASE_PATH}${pathname}${request.nextUrl.search}`)

    return new NextRequest(url, request)
}

export async function GET(request: NextRequest) {
    return await handlers.GET(rewriteRequest(request))
}

export async function POST(request: NextRequest) {
    return await handlers.POST(rewriteRequest(request))
}