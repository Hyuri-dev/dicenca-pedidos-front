import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypeInvoiceQuery } from "../querys/useTypeInvoice.query";
import { useNewVentaStore } from "../store/controladorNewVenta.store";
import { SpinnerGlobal } from "./SpinnerGlobal";
import { Label } from "@/components/ui/label";

export default function SelectTypeInvoice() {
  const {
    query: { data: typeInvoices, isLoading },
  } = useTypeInvoiceQuery();

  const { setTypeInvoice } = useNewVentaStore();

  if (isLoading) {
    return <SpinnerGlobal />;
  }

  return (
    <div className="flex flex-col gap-1">
      <Label>Tipo de factura:</Label>
      <Select
        onValueChange={(value) => {
          const selectedInvoice = typeInvoices?.find(
            (s) => s.id.toString() === value,
          );

          if (selectedInvoice) {
            setTypeInvoice(selectedInvoice.id);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona el tipo de factura" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de factura</SelectLabel>
            {typeInvoices?.map((typeinvoice) => (
              <SelectItem
                key={typeinvoice.id}
                value={typeinvoice.id.toString()}
              >
                {typeinvoice.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
