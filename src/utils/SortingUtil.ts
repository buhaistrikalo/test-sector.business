
import { filter } from 'lodash';

export type SortingType = 'asc' | 'desc';

export const descendingComparator = (a: any, b: any, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export const getComparator = (order: SortingType, orderBy: string) => {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export const applySortFilter = (array: any[], comparator: (a: any, b: any) => number, queryFilter: (a: any, b: string) => boolean, query: string) => {
    const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(stabilizedThis.map((el) => el[0]), (_post) => queryFilter(_post, query));
    }
    return stabilizedThis.map((el) => el[0]);
}