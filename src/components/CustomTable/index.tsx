
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type SortingType = 'asc' | 'desc';

const StyledTableSortLabel = styled(TableSortLabel)(() => ({
    transition: 'color 0.4s',
    '&.Mui-active': { color: '#fff' },
    '&:hover': { color: '#d3d3d3' },
    '&.Mui-active.MuiTableSortLabel-icon': { display: 'none' },
}));

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#474955',
        color: '#fff',
    },
    [`&.${tableCellClasses.body}`]: {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        fontSize: 14,
    },
    '&.table-id': { width: '5%' },
    '&.table-title': { width: '40%' },
    // '&.table-body': { width: '35%' },

    '&:last-child': {
        borderRight: 0,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));

const StyledSortIcon = styled(KeyboardArrowDownIcon)(() => ({
    marginLeft: '15px',
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
        return filter(stabilizedThis.map((el) => el[0]), (_post) => _post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

interface CustomTableProps {
    posts?: IPost[],
    filter: string,
    page: number,
    rowsPerPage: number
}


const CustomTable: FC<CustomTableProps> = ({
    posts,
    filter,
    page,
    rowsPerPage }) => {
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
        <TableContainer component={Paper} sx={{ height: 770 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {TABLE_HEAD.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                align={headCell.alignLeft ? 'left' : 'center'}
                                sortDirection={orderBy === headCell.id ? order as SortDirection : false}
                            >
                                <StyledTableSortLabel
                                    hideSortIcon={true}
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order as SortingType : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                    IconComponent={() => order === 'desc'
                                        ? <StyledSortIcon sx={{ transform: 'rotate(180deg)' }} />
                                        : <StyledSortIcon />}
                                >
                                    {headCell.label}
                                </StyledTableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPosts
                        ?.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                        .map((post) => (
                            <StyledTableRow key={post.id}>
                                <StyledTableCell component="th" scope="row" className='table-id'>
                                    {post.id}
                                </StyledTableCell>
                                <StyledTableCell className='table-title'>{post.title}</StyledTableCell>
                                <StyledTableCell className='table-body'>{post.body}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default CustomTable

function b(a: any, arg1: any[], b: any, arg3: any[]) {
    throw new Error('Function not implemented.');
}
