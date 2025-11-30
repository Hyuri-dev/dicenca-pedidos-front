"use client";
import { usePortfolioQuery } from "@/app/querys/usePortfolio.query";
import { useProductQuery } from "@/app/querys/useProduct.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [portafolioName, setPortafolioName] = useState("");
  // const router = useRouter();
  const {
    query: { data, isLoading },
    createPortfolioMutation,
    // deletePortfolioMutation,
    // editPortfolioMutation,
  } = usePortfolioQuery();
  // const {
  //   query: { data, isLoading },
  //   createProductMutation,
  //   deleteProductMutation,
  //   editProductMutation,
  // } = useProductQuery();
  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <p>Portafolios</p>
      <div className="flex gap-1.5">
        <Input
          type="text"
          required
          onChange={(e) => setPortafolioName(e.target.value)}
        ></Input>
        {/* Renderizado condicional
        debe haber un portafolio name y tambien el length debe ser mayor a 0,
        entonces si cumple, se renderiza el boton
         */}
        {portafolioName && portafolioName.length > 0 && (
          <Button
            className=""
            onClick={() => {
              createPortfolioMutation.mutateAsync(portafolioName, {
                onSuccess: () => {
                  toast("Portafolio creado exitosamente");
                },
              });
            }}
          >
            <Plus />
          </Button>
        )}
      </div>
      <p>{portafolioName}</p>
      <div className="flex w-full flex-col gap-2">
        {!isLoading &&
          data?.map((portafolio, index) => (
            <div
              key={index}
              className="flex w-full p-2 bg-white shadow-sm rounded-sm"
            >
              {portafolio.name}
            </div>
          ))}
      </div>
    </div>
  );
}
