interface CreateSuccessResponseParams {
    data: any;
    message: string;
}

export const createSuccessResponse = ({
    data,
    message,
}: CreateSuccessResponseParams) => ({
    isSuccess: true,
    message,
    data,
});
