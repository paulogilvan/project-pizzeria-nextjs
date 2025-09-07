"use client"

import { useCart } from "@/stores/cart";
import { Button } from "../ui/button"
import { useProducts } from "@/stores/products";
import { useEffect, useState } from "react";
import { CartProduct } from "./cart-product";
import { parse } from "path";
import { decimalToMoney } from "@/lib/utils";

export const CartList = () => {
    const cart = useCart();
    const products = useProducts();

    const [subtotal, setSubtotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(10);

    const calculateSubtotal = () => {
        let sub = 0;
        for(let item of cart.items) {
            const prod = products.products.find(pitem => pitem.id === item.productId);
            if(prod) sub += item.quantity * parseFloat(prod.price.toString());
        }
        setSubtotal(sub);
    }
    useEffect(calculateSubtotal, [cart]);

  return (
    <>
        <div className="flex flex-col gap-3 my-5">
            {cart.items.map(item => (
                <CartProduct 
                    key={item.productId}
                    data={item}
                />
            ))}
        </div>
        <div className="my-4 text-right">
            <div>Sub-total: {decimalToMoney(subtotal)}</div>
            <div>Frete: {decimalToMoney(shippingCost)}</div>
            <div className="font-bold">total: {decimalToMoney(subtotal + shippingCost)}</div>
        </div>
        <Button>Finalizar compra</Button>
    </>
  )
}