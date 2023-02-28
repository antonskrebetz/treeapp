import { Dispatch, SetStateAction } from "react";
import { EModalType } from "../components/controls/Controls";

export interface INodeAction {
    nodeId: number;
    inputValue?: string;
}

export interface IElementListProps {
    tree: IChildElement[];
    refreshData: () => void;
}

export interface IChildElement {
    name: string;
    id: number;
    children: IChildElement[];
    isRoot?: boolean;
    refreshData: () => void;
}

export interface IElementProps {
    node: {
        name: string;
        id: number;
        children: IChildElement[];
    }
}

export interface IDialogWindowProps {
	type: EModalType | null;
    setModalType: Dispatch<SetStateAction<EModalType | null>>;
    isOpen: boolean;
    setIsOpen: any;
    nodeName: string;
    nodeId: number;
    refreshData: () => void;
}

export interface IControlsProps {
    nodeName: string;
    nodeId: number;
    isRoot?: boolean | undefined;
    refreshData: () => void;
}
