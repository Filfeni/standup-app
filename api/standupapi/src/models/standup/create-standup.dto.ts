type createStandupRequestDto = {
    title : string;
    description? : string;
    createdBy : number;
    disabled : boolean;
}

export {createStandupRequestDto}