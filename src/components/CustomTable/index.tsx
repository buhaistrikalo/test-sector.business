
import React, { FC, useState } from 'react'
import { IPost } from 'models/IPost'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses, SortDirection } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { filter } from 'lodash';

interface CustomTableProps {
    posts?: IPost[],
    filter: string
}

type SortingType = 'asc' | 'desc';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#474955',
        color: '#fff',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignLeft: true },
    { id: 'title', label: 'Заголовок', alignLeft: false },
    { id: 'body', label: 'Описание', alignLeft: false }
];

function descendingComparator(a: IPost, b: IPost, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: SortingType, orderBy: string) {
    return order === 'desc'
        ? (a: IPost, b: IPost) => descendingComparator(a, b, orderBy)
        : (a: IPost, b: IPost) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: IPost[], comparator: (a: IPost, b: IPost) => number, query: string) {
    const stabilizedThis = array.map((el, index) => [el, index] as [IPost, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_post) => _post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const CustomTable: FC<CustomTableProps> = ({ posts, filter }) => {
    // Paggination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // Sorting
    const [order, setOrder] = useState('asc' as SortingType);
    const [orderBy, setOrderBy] = useState('');

    const createSortHandler = (property: string) => (event: React.MouseEvent) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event: React.MouseEvent, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredPosts = posts && applySortFilter(posts, getComparator(order, orderBy), filter);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {TABLE_HEAD.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                align={headCell.alignLeft ? 'left' : 'center'}
                                sortDirection={orderBy === headCell.id ? order as SortDirection : false}
                            >

                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order as SortingType : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box sx={{ ...visuallyHidden }}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPosts
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((post) => (
                            <StyledTableRow key={post.id}>
                                <StyledTableCell component="th" scope="row">
                                    {post.id}
                                </StyledTableCell>
                                <StyledTableCell>{post.title}</StyledTableCell>
                                <StyledTableCell >{post.body}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomTable

function b(a: any, arg1: any[], b: any, arg3: any[]) {
    throw new Error('Function not implemented.');
}
