import { useState } from 'react';
import { IControlsProps } from '../../interfaces/interfaces';

import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DialogWindow } from '../modal/Modal';

import './controls.css';

export enum EModalType {
    ADD = 'ADD',
    EDIT = 'EDIT',
    DELETE = 'DELETE'
}

export const Controls = ({nodeName, nodeId, isRoot, refreshData}: IControlsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<EModalType | null>(null);

    const onAddClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setModalType(EModalType.ADD);
        setIsOpen(true);
    }

    const onEditClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setModalType(EModalType.EDIT)
        setIsOpen(true);
    }

    const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setModalType(EModalType.DELETE);
        setIsOpen(true);
    }

    return (
        <div className="controls-wrapper">
            <IconButton 
                size='small' 
                onClick={onAddClick}
                sx={{ ':hover': { color: 'success.light' } }}
            >
                <AddBoxIcon fontSize="small" />
            </IconButton>
            {!isRoot && (
                <>
                    <IconButton 
                        size='small' 
                        onClick={onEditClick}   
                        sx={{ ':hover': { color: 'info.light' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                        size='small'
                        onClick={onDeleteClick} 
                        sx={{ ':hover': { color: 'error.light' } }}
                    >
                        <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                </>
            )}
            <DialogWindow 
                type={modalType}
                setModalType={setModalType}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                nodeName={nodeName}
                nodeId={nodeId}
                refreshData={refreshData}
            />
        </div>
    )
}
