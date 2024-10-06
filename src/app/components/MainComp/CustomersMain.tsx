"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown } from "lucide-react";

// Mock data for customers
const customers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    totalOrders: 15,
    totalSpent: 1250.5,
    status: "Active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    totalOrders: 8,
    totalSpent: 780.25,
    status: "Inactive",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    totalOrders: 22,
    totalSpent: 2100.75,
    status: "Active",
  },
  {
    id: "4",
    name: "Diana Ross",
    email: "diana@example.com",
    totalOrders: 5,
    totalSpent: 450.0,
    status: "Active",
  },
  {
    id: "5",
    name: "Edward Norton",
    email: "edward@example.com",
    totalOrders: 12,
    totalSpent: 1050.3,
    status: "Active",
  },
  {
    id: "6",
    name: "Fiona Apple",
    email: "fiona@example.com",
    totalOrders: 3,
    totalSpent: 275.5,
    status: "Inactive",
  },
  {
    id: "7",
    name: "George Clooney",
    email: "george@example.com",
    totalOrders: 18,
    totalSpent: 1800.0,
    status: "Active",
  },
  {
    id: "8",
    name: "Helen Mirren",
    email: "helen@example.com",
    totalOrders: 9,
    totalSpent: 920.75,
    status: "Active",
  },
  {
    id: "9",
    name: "Ian McKellen",
    email: "ian@example.com",
    totalOrders: 7,
    totalSpent: 680.25,
    status: "Inactive",
  },
  {
    id: "10",
    name: "Julia Roberts",
    email: "julia@example.com",
    totalOrders: 25,
    totalSpent: 2500.0,
    status: "Active",
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b])
      return sortOrder === "asc" ? -1 : 1;
    if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b])
      return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer,
  );

  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="mx-auto size-full">
      <CardHeader>
        <CardTitle className="text-2xl">Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name
                  <ArrowUpDown className="ml-2 size-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("email")}>
                  Email
                  <ArrowUpDown className="ml-2 size-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("totalOrders")}
                >
                  Total Orders
                  <ArrowUpDown className="ml-2 size-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("totalSpent")}
                >
                  Total Spent
                  <ArrowUpDown className="ml-2 size-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="mr-2 size-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={customer.name}
                      />
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell className="text-right">
                  {customer.totalOrders}
                </TableCell>
                <TableCell className="text-right">
                  ${customer.totalSpent.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-between">
          <div>
            Showing {indexOfFirstCustomer + 1} to{" "}
            {Math.min(indexOfLastCustomer, sortedCustomers.length)} of{" "}
            {sortedCustomers.length} customers
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
