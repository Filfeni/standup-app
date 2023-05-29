type createStandupUpdateRequestDto = {
    wasDoing: string,
    willDo: string,
    blockers: string,
    createdDate: Date,
    missingInfo: boolean,
    disabled: boolean,
    standupUserId: number
}

export {createStandupUpdateRequestDto}