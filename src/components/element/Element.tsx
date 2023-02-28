import { useState } from 'react';
import { IChildElement } from '../../interfaces/interfaces';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Controls } from '../controls/Controls';
import { ElementsList } from '../elementsList/ElementLists';

import './element.css';

export const Element = ({name, id, children, isRoot, refreshData}: IChildElement) => {
    const [showChildren, setShowChildren] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const hasChild = children.length > 0;

    const handleMouseEnter = () => {
        setIsHover(true);
    };
  
     const handleMouseLeave = () => {
        setIsHover(false);
    };
    
    const handleClick = () => {
        setShowChildren(!showChildren);
    };

    return (
        <>
            <div 
                onClick={handleClick} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
                className="element"
            >
                {hasChild && (
                    <div className={`element-arrow ${showChildren ? 'element-arrow-active' : ''}`}>
                        <IconButton size='small' sx={{ ':hover': { color: 'white' } }}>
                            <KeyboardArrowRightIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                )}
                <div className="element-content">
                    <span>{name}</span>
                    {(isHover || showChildren) && (
                        <Controls 
                            nodeName={name} 
                            nodeId={id} 
                            isRoot={isRoot} 
                            refreshData={refreshData}
                        />
                    )}
                </div>
            </div>
            <ul style={{ paddingLeft: "15px"}}>
                {showChildren && <ElementsList tree={children} refreshData={refreshData} />}
            </ul>
        </>
    );
}
