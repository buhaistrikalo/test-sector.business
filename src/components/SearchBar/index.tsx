import React, { FC, useState } from 'react'

import { styled } from '@mui/material/styles';
import { InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    transition: theme.transitions.create(['box-shadow', 'width', 'color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    background: '#5A5C66',
    border: 0,
    borderRadius: 0,
    width: 640,
    color: '#B2B7BF',
    '&.Mui-focused': { width: 640, color: '#fff' },
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${theme.palette.grey[500]} !important`
    }

}));

interface SearchBarProps {
    filter: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ filter, handleChange }) => {
    return (
        <SearchStyle
            value={filter}
            onChange={handleChange}
            placeholder="Поиск"
            endAdornment={
                <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#fff', fontSize: 21 }} />
                </InputAdornment>
            }
        />
    )
}

export default SearchBar