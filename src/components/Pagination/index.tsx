import React, { FC } from 'react'

import { Stack, styled, Typography, Box, Grid } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';

const StyledButtons = styled(Typography)(() => ({
    fontSize: 24,
    fontWeight: 500,
    margin: '0 40px',
    transition: 'color .4s',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
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

const PaginationButton = styled('button')({
    fontWeight: '700',
    fontSize: 18,
    fontStyle: 'italic',
    border: 0,
    background: 0,
    cursor: 'pointer',
});

interface PaginationProps {
    page: number,
    countPages: number,
    handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void
}

const Pagination: FC<PaginationProps> = ({ page, countPages, handleChangePage }) => {
    const { items } = usePagination({
        count: countPages,
        page: page,
        onChange: handleChangePage,
        boundaryCount: 0,
        siblingCount: 2,
    })

    const paginationFilter = (buttonPage: number) => {
        // Фильтрация ненужных кнопок (первая, последняя)
        if (buttonPage === null) return
        if (page - 2 > buttonPage && page + 2 <= countPages) return
        else if (buttonPage < countPages - 4 && (page === countPages || page === countPages - 1)) return
        if (page + 2 < buttonPage && page - 2 > 0) return
        else if (buttonPage === 6 && (page === 1 || page === 2)) return
        return true
    }

    return (countPages > 0 ?
        <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
                <StyledButtons onClick={(e) => handleChangePage(e, page - 1)}
                    className={page <= 1 ? 'disabled' : ''}>
                    Назад
                </StyledButtons>
            </Grid>
            <Grid item >
                {items
                    // Фильтрация ненужных кнопок (первая, последняя)
                    .filter(({ page }) => page && paginationFilter(page))
                    .map(({ page, type, selected, ...item }, index) => {
                        let children = null;
                        if (type === 'page') {
                            children = (
                                <PaginationButton
                                    key={index}
                                    type="button"
                                    style={{
                                        color: selected ? '#7EBC3C' : '#474955',
                                    }}
                                    {...item}
                                >
                                    {page}
                                </PaginationButton>
                            );
                        }
                        return children;
                    })}
            </Grid>
            <Grid item>
                <StyledButtons onClick={(e) => handleChangePage(e, page + 1)}
                    className={page >= countPages ? 'disabled' : ''}>
                    Вперед
                </StyledButtons>
            </Grid>

        </Grid >
        : <></>

    )
}

export default Pagination
