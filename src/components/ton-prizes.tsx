export default function TonPrizes({ nanos }: { nanos: number }) {
    const NANOS_IN_TON = 1_000_000_000;
    const tons = nanos / NANOS_IN_TON;

    const formatted = tons.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    return (
        <div className="flex flex-row gap-2">
            <span>{formatted}</span>
            <span>TON</span>
        </div>
    );
}
