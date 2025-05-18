"use client"

import * as React from "react"
import {
  SearchIcon,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import Link from "next/link"

export default function SearchBox() {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  const products = useSelector((state: RootState) => state.product.products)

  const filteredProducts = searchTerm ? products.filter((product) => product.title.toLowerCase().startsWith(searchTerm.toLowerCase())) : []

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        className="hidden md:inline-flex border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50  h-9 shadow-md w-[40%] rounded-md border px-6 py-5 text-sm  transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/80 font-rob">Search</span>
        </span>
        <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[1.2rem] font-medium">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search sneakers..." value={searchTerm} onValueChange={setSearchTerm} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {filteredProducts.map((product) => 
            <Link key={product._id} href={`/product/product-details/${product._id}`} onClick={() => setOpen(false)}>
                <CommandItem>
                  {product.title}
                </CommandItem>
            </Link>)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
