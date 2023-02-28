import { INodeAction } from "../interfaces/interfaces";

const baseAPI = 'https://test.vmarmysh.com/api.user.tree';
const treeName = '19c85714-cb0f-4ff1-9053-59d7b9e1e086';

export const fetchTree = async () => {
    const response = await fetch(`${baseAPI}.get?treeName=${treeName}`, {
        method: 'POST',
    });
    return await response.json();
};

export const createNode = async ({nodeId, inputValue}: INodeAction) => {
    await fetch(`${baseAPI}.node.create?treeName=${treeName}&parentNodeId=${nodeId}&nodeName=${inputValue}`, {
        method: 'POST',
    });
};

export const renameNode = async ({nodeId, inputValue}: INodeAction) => {
    await fetch(`${baseAPI}.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${inputValue}`, {
        method: 'POST',
    });
};

export const deleteNode = async ({nodeId}: INodeAction) => {
    const response = await fetch(`${baseAPI}.node.delete?treeName=${treeName}&nodeId=${nodeId}`, {
        method: 'POST',
    });
    if (response.status === 500) {
        throw new Error();
    }
    return response;
};
