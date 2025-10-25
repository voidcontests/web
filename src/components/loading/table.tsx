import { Table, TableCaption, TableContainer, TableTitle } from '@/ui/table';

export default function Loading({ title }: { title: string }) {
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
