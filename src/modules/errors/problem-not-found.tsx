import ErrorMessage from "@/modules/errors/message";

export default function ProblemNotFound() {
    return (
        <ErrorMessage
            title='PROBLEM NOT FOUND'
            message='It appears that this problem does not exist in the contest. Please verify the contest details or check back later.'
        />
    );
}
