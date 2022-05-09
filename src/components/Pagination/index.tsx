import React, { FC } from 'react'

import Paginations, { PaginationRenderItemParams } from '@mui/material/Pagination';
import { PaginationItem, Stack, styled, Typography, Box } from '@mui/material';

interface PaginationProps {
    page: number,
    count: number,
    handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void
}

const StyledButtons = styled(Typography)((sx) => ({
    fontSize: 24,
    fontWeight: 500,
    margin: '0 40px',
    transition: 'color .4s',
    cursor: 'pointer',
    '&:hover': {
        color: '#7EBC3C',
    },
    '&.disabled': {
        pointerEvents: 'none',
        cursor: 'not-allowed',
        filter: 'alpha(opacity=65)',
        boxShadow: 'none',
        opacity: '.45',
    }
}));

const Pagination: FC<PaginationProps> = ({ page, count, handleChangePage }) => {
    const paginationItem = (item: PaginationRenderItemParams) => {
        if (item.page === null) return
        if (page - 2 > item.page && page + 2 <= count) return
        else if (item.page < count - 4 && (page === count || page === count - 1)) return
        if (page + 2 < item.page && page - 2 > 0) return
        else if (item.page === 6 && (page === 1 || page === 2)) return
        return <PaginationItem
            {...item}
        />
    }

    return (count > 0 ?
        <Stack direction='row' justifyContent='space-between'>
            <Box width={200}>

                <StyledButtons onClick={(e) => handleChangePage(e, page - 1)}
                    className={page <= 1 ? 'disabled' : ''}>Назад</StyledButtons>

            </Box>
            <Paginations
                boundaryCount={0}
                siblingCount={2}
                count={count}
                page={page}
                onChange={handleChangePage}
                hidePrevButton
                hideNextButton
                renderItem={paginationItem}
            />
            <Box width={200}>
                {
                    page >= count
                        ? <></>
                        : <StyledButtons onClick={(e) => handleChangePage(e, page + 1)} >Вперед</StyledButtons>
                }
            </Box>

        </Stack >
        : <></>

    )
}

export default Pagination