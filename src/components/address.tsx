import { Link } from "@/components/ui/link";
import { truncate_address } from "@/lib/strings";

const EXPLORER_BASEPATH = "https://tonscan.org";

export default function Address({ address }: { address: string }) {
    return (
        <Link
            href={`${EXPLORER_BASEPATH}/address/${address}`}
            size="large"
            target="_blank"
            rel="noopener noreferrer"
        >
            {truncate_address(address, 8)}
        </Link>
    );
}
