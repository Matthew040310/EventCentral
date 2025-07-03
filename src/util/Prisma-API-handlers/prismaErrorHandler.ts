export default function errorHandler(
    context: string,
    error: any,
) {
    let errorDetails = `\n${String(error).split("\n\n")[1]}`;
    return `${context} ${errorDetails}`;
}