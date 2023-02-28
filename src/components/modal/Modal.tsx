import { useEffect, useState } from "react";
import { createNode, deleteNode, renameNode } from "../../services/httpService";
import { IDialogWindowProps } from "../../interfaces/interfaces";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { 
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import Input from '@mui/material/Input';

import { EModalType } from "../controls/Controls";

export const DialogWindow = ({
    type,
    isOpen,
    setIsOpen,
    nodeName,
    nodeId,
    refreshData
}: IDialogWindowProps) => {
    const isDeleteType = type === EModalType.DELETE;
    const isEditType = type === EModalType.EDIT;

    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isEditType) {
            setInputValue(nodeName)
        } else {
            setInputValue('')
        }
    }, [isEditType, nodeName, type]);

    const modalTypeMap = {
        ADD: {
            title: 'Add new node',
            btnName: 'Add',
            actionClick: createNode,
        },
        EDIT: {
            title: 'Rename node',
            btnName: 'Rename',
            actionClick: renameNode,
        },
        DELETE: {
            title: 'Delete',
            btnName: 'Delete',
            actionClick: deleteNode,
        },
    }

    const onActionBtnClick = async () => {
        setIsOpen(false);
        if (type) {
            try {
                await modalTypeMap[type].actionClick({nodeId, inputValue});
            } catch(error) {
                setIsError(true)
                setIsOpen(true);
            }
            refreshData();
        }
    }

    return (
        <>
            <Dialog 
                open={isOpen}
                onClose={(e: MouseEvent) => {
                    e.stopPropagation();
                    setIsOpen(false)}
                }
                aria-labelledby="dialog-title" 
                aria-describedby="dialog-description"
            >
                {type && (
                    <DialogTitle id="dialog-title">
                        {!isError ? modalTypeMap[type].title : 'Error'}
                    </DialogTitle>
                )}
                <DialogContent id="dialog-description" sx={{ minWidth: 250 }}>
                    {!isDeleteType && !isError && (
                        <Input 
                            id="outlined-basic" 
                            fullWidth 
                            value={inputValue}
                            placeholder="Node's name" 
                            onChange={(e) => setInputValue(e.target.value)} 
                        />
                    )}
                    {(isDeleteType || isError) && (
                        <DialogContentText>
                            {isDeleteType && !isError 
                                ? `Do you want to delete ${nodeName}?`
                                : 'You have to delete all children nodes first'}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setIsOpen(false)}
                        variant="outlined"
                        size="small"
                    >
                        Cancel
                    </Button>
                    {(type && !isError) && (
                        <Button 
                            onClick={onActionBtnClick} 
                            variant="contained"
                            size="small"
                            color={isDeleteType ? 'error' : 'primary'}
                        >
                            {modalTypeMap[type].btnName}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}
