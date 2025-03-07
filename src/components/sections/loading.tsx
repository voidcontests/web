import { Table, TableCaption, TableContainer, TableTitle } from '@/components/ui/table';

export function TableTemplate({ title }: { title: string }) {
    return (
        <TableContainer>
            <TableTitle>
                {title}
            </TableTitle>
            <Table>
                <TableCaption>
                    Loading...
                </TableCaption>
            </Table>
        </TableContainer>
    );
}
