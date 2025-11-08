import { Link } from "@/ui/link";

const EXPLORER_BASEPATH = "https://tonscan.org";

const truncate_address = (address: string, len: number = 6): string => {
    if (address.length < 2 * len) return address;
    return `${address.slice(0, len)}...${address.slice(-len)}`;
}

export default function Tx({ tx, notruncate, length = 12 }: { tx: string, notruncate?: boolean, length?: number }) {
    // TODO: move explorer address to env
    return (
        <Link
            href={`https://testnet.tonscan.org/tx/${tx}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {
                notruncate
                    ? tx
                    : truncate_address(tx, length)
            }
        </Link>
    );
}
