import { IElementListProps } from "../../interfaces/interfaces";
import { Element } from "../element/Element";

export const ElementsList = ({tree, refreshData}: IElementListProps) => {
    return (
        <div className="flex-col">
            {tree.map((tree) => {
                return (
                    <Element 
                        name={tree.name} 
                        id={tree.id} 
                        children={tree.children}
                        key={tree.id}
                        refreshData={refreshData}
                    />
                )
            })}
        </div>
    )
}
