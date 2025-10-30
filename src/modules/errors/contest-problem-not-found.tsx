import ErrorMessage from "@/modules/errors/message";

export default function ContestProblemNotFound() {
    return (
        <ErrorMessage
            title='PROBLEM NOT EXISTS'
            message='It appears that this problem does not exist in the contest. Please check the contest details or try again later.'
        />
    );
}
