'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShoppingCartIcon } from "lucide-react"
import { useState } from "react"

type Props = {
  availiableSizes: number[]
  onAddToCart: (selectedSize: number) => void;
}


export default function ComponentModal( {availiableSizes, onAddToCart} : Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if(selected !== null){
      onAddToCart(selected)
      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <ShoppingCartIcon/>
        </button>   
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
           Select Size
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <form className="space-y-5">
            <div className="space-y-4">
              <div>
                <fieldset className="space-y-4">
                  <RadioGroup onValueChange={(val) => setSelected(parseInt(val))} className="flex gap-0 -space-x-px rounded-md shadow-xs">
                    {availiableSizes.map((number) => (
                         <label
                        key={number}
                        className="border-input has-data-[state=checked]:bg-green has-data-[state=checked]:text-white has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 flex-1 cursor-pointer flex-col items-center  font-semibold rounded-md justify-center gap-3 border text-center text-sm transition-[color,box-shadow] outline-none first:rounded-s-md last:rounded-e-md has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:z-10"
                      >
                          <RadioGroupItem
                          id={`radio-17-r${number}`}
                          value={number.toString()}
                          className="sr-only after:absolute after:inset-0"
                        />
                        {number}
                        </label>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            </div>
            <Button type="button" onClick={handleClick} className="w-full">
              Add to Cart
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
