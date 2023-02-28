import { useEffect, useState } from 'react';
import { fetchTree } from '../../services/httpService';
import { nanoid } from 'nanoid';

import { IChildElement } from '../../interfaces/interfaces';
import { Element } from '../element/Element';

import './App.css';

function App() {
    const [tree, setTree] = useState<IChildElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [key, setKey] = useState('');

    const refreshData = () => {
        setKey(nanoid())
    }

    useEffect(() => {
        fetchTree()
            .then((tree: IChildElement) => {
                setTree(tree);
                setIsLoading(false);
            })
            .catch(() => {
                setIsError(true);
                setIsLoading(false);
            })
    }, [key]);

    return (
        <div className="App">
            <div className='app-header'>
                <span>Anton Skrabets</span>
                <a href="https://www.linkedin.com/in/antonskrebetz/">My LinkedIn</a>
                <a href="https://drive.google.com/file/d/1ArOJcj-vBcs7jpRRmbmM7ry2gho8c5Ck/view?usp=share_link">My Resume</a>
            </div>
            {isLoading && <div>Loading data...</div>}
            {isError && <div>Something went wrong...</div>}
            {tree &&
                <Element 
                    name='Root'
                    id={tree.id}
                    children={tree.children}
                    key={tree.id}
                    isRoot
                    refreshData={refreshData}
                />
            }
        </div>
    );
}

export default App;
