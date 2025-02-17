import { truncate_address } from "@/lib/strings";
import { Link } from "@/components/ui/link";
import { Address as Addr } from "@ton/core";

const EXPLORER_BASEPATH = "https://tonscan.org";

export default function Address({ address, notruncate, length = 12 }: { address: string, notruncate?: boolean, length?: number }) {
    const addr = Addr.parse(address).toString({ bounceable: false });

    return (
        <Link
            href={`${EXPLORER_BASEPATH}/address/${addr}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {
                notruncate
                    ? addr
                    : truncate_address(addr, length)
            }
        </Link>
    );
}
