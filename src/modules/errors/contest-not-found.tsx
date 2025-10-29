import ErrorMessage from "@/modules/errors/message";

export default function ContestNotFound() {
    return (
        <ErrorMessage
            title='CONTEST NOT FOUND'
            message='The contest you are looking for does not exist. Please check the contest ID and try again.'
        />
    );
}
