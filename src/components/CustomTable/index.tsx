
import { FC } from 'react'
import { IPost } from 'models/IPost'
import { Stack } from '@mui/material'

interface CustomTableProps {
    posts?: IPost[]
}

const CustomTable: FC<CustomTableProps> = ({ posts }) => {
    return (
        <Stack spacing={2}>
            {
                posts?.map(post =>
                    <Stack>{post.title}</Stack>
                )
            }
        </Stack>
    )
}

export default CustomTable