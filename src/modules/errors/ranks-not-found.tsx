import ErrorMessage from "@/modules/errors/message";

export default function RanksNotFound() {
    return (
        <ErrorMessage
            title='LEADERBOARD NOT EXISTS'
            message='The contest for which you are trying to access the leaderboard does not seem to exist. Please verify the contest ID and try again. If you believe this is an error, please contact support for further assistance.'
        />
    );
}
