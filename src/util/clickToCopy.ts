export default async function clickToCopy(text: string, setCopied: (val: boolean) => void) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
}
