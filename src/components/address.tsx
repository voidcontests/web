import { Link } from "@/ui/link";

const EXPLORER_BASEPATH = "https://tonscan.org";

const truncate_address = (address: string, len: number = 6): string => {
    if (address.length < 2 * len) return address;
    return `${address.slice(0, len)}...${address.slice(-len)}`;
}

export default function Address({ address, notruncate, length = 12 }: { address: string, notruncate?: boolean, length?: number }) {
    // TODO: move explorer address to env
    return (
        <Link
            href={`https://testnet.tonscan.org/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {
                notruncate
                    ? address
                    : truncate_address(address, length)
            }
        </Link>
    );
}
