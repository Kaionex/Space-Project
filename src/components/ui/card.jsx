import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, imageUrl, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-48 h-60 bg-gray-800 shadow-xl transform transition-all duration-300 px-0 flex flex-col relative hover:scale-120", className)}
    style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("font-serif text-lg leading-4 overflow-hidden overflow-ellipsis max-h-30 self-start absolute px-3 pb-8 bottom-0  z-10 flex items-center justify-center text-white font-bold", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("absolute inset-x-0 bottom-16 z-10 px-4 py-4 font-sans text-xs leading-3 overflow-hidden overflow-ellipsis max-h-20 transition-all duration-500 flex-grow-0 h-40 bg-transparent text-white rounded", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-0 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(`like-button absolute inset-x-0 bottom-0 z-10 mt-10 mx-3 text-xs font-sans  uppercase w-8 h-10 transition-all duration-300  text-white flex-grow-0 hover:scale-x-125 hover:scale-y-125`, className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }