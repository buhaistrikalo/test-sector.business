
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
    // ...selectedActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(allActions, dispatch)
}