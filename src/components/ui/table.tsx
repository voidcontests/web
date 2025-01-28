import { cn } from "@/lib/utils";
import * as React from "react";

const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="bg-secondary border rounded-xl relative w-full overflow-auto"
    {...props}
  />
));
TableContainer.displayName = "TableContainer";

const TableHead = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('h-12 text-sm flex items-center font-medium px-5 border-b', className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableHeaderRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <thead className="h-4 overflow-hidden bg-secondary [&_tr]:border-b">
    <tr ref={ref} className={cn("h-8 border-b transition-colors", className)} {...props} />
  </thead>
));
TableHeaderRow.displayName = "TableHeaderRow";

const TableHeaderCell = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "first:px-5 first:w-0 h-full text-left text-sm text-muted-text font-normal align-middle",
      className,
    )}
    {...props}
  />
));
TableHeaderCell.displayName = "TableHeaderCell";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "h-10 border-b transition-colors",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "first:px-5 first:w-0 h-full text-left text-sm align-middle",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "h-10 w-full flex items-center justify-center bg-transparent font-regular text-sm text-primary-text border-t [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("py-2 text-sm text-secondary-text border-t", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableHeaderRow,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableFooter,
  TableCaption,
}
