"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "next-themes";

// Mock data for products
const products = [
  {
    id: "1",
    name: "Smartphone X",
    category: "Electronics",
    price: 799.99,
    stock: 50,
  },
  {
    id: "2",
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    stock: 30,
  },
  {
    id: "3",
    name: "Running Shoes",
    category: "Sports",
    price: 89.99,
    stock: 100,
  },
  { id: "4", name: "Coffee Maker", category: "Home", price: 59.99, stock: 75 },
  {
    id: "5",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 129.99,
    stock: 200,
  },
  { id: "6", name: "Yoga Mat", category: "Sports", price: 29.99, stock: 150 },
  { id: "7", name: "Blender", category: "Home", price: 39.99, stock: 80 },
  {
    id: "8",
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 60,
  },
  { id: "9", name: "Backpack", category: "Fashion", price: 49.99, stock: 120 },
  { id: "10", name: "Desk Lamp", category: "Home", price: 24.99, stock: 90 },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.includes(searchTerm)) &&
      (categoryFilter === "All" || product.category === categoryFilter),
  );
  const sortedProducts = [...filteredProducts]
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "accent",
        });
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "stock") {
        return a.stock - b.stock;
      }
      return 0;
    })
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return -1;
      }
      return 1;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const { theme } = useTheme();
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <div className="mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full cursor-pointer md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Sports">Sports</SelectItem>
            <SelectItem value="Home">Home</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleSortOrder}>
            <ArrowUpDown className="size-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <MagicCard gradientColor={theme === "dark" ? "#262626" : "#27272a"}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="grow">
                <p className="mb-2 text-muted-foreground">ID: {product.id}</p>
                <Badge>{product.category}</Badge>
                <p className="mt-2">Price: ${product.price.toFixed(2)}</p>
                <p>Stock: {product.stock}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </MagicCard>
          </Card>
        ))}
      </div>
      {sortedProducts.length === 0 && (
        <p className="mt-6 text-center text-muted-foreground">
          No products found.
        </p>
      )}
    </div>
  );
}
