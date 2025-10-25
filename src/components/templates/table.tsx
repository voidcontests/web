import { Table, TableCaption, TableContainer, TableTitle } from '@/ui/table';

interface Props {
    title: string,
    caption: string,
}

export default function TableTemplate({ title, caption }: Props) {
    return (
        <TableContainer>
            <TableTitle>
                {title}
            </TableTitle>
            <Table>
                <TableCaption>
                    {caption}
                </TableCaption>
            </Table>
        </TableContainer>
    );
}
