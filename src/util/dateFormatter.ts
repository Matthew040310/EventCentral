import dayjs from 'dayjs';

export default function dateFormatter(date: string | Date | null): string {
    if (!date) return '';
    return dayjs(date).format('DD MMM YYYY');
}