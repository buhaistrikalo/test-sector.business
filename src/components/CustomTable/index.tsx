
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { applySortFilter, getComparator, SortingType } from 'utils/SortingUtil';

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

const StyledSortIcon = styled(KeyboardArrowDownIcon)(() => ({
    marginLeft: '15px',
}));

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignLeft: true },
    { id: 'title', label: 'Заголовок', alignLeft: false },
    { id: 'body', label: 'Описание', alignLeft: false }
];



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

    const queryFilter = (post: IPost, query: string) => {
        return post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    }
    const filteredPosts = posts && applySortFilter(posts, getComparator(order, orderBy), queryFilter, filter);

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
                            <TableRow key={post.id}>
                                <StyledTableCell component="th" scope="row" className='table-id'>
                                    {post.id}
                                </StyledTableCell>
                                <StyledTableCell className='table-title'>{post.title}</StyledTableCell>
                                <StyledTableCell className='table-body'>{post.body}</StyledTableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default CustomTable