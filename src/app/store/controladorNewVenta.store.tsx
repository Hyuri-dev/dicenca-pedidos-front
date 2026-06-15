import { create } from "zustand";
import {
  ClientProps,
  CreateOrderProps,
  OrderDetailsProps,
  UserProps,
  ZoneProps,
} from "../types/types";

interface ControladorStateProps {
  seller: UserProps | undefined;
  zone: ZoneProps | undefined;
  client: ClientProps | undefined;
  order: CreateOrderProps;
  reset: () => void;
  setSeller: (seller: UserProps) => void;
  setZone: (zone: ZoneProps) => void;
  setClient: (client: ClientProps) => void;
  setOrderNote: (notes: string) => void;
  setTypeInvoice: (typeInvoiceId: number) => void;
  addDetailToOrder: (
    detail: Omit<
      OrderDetailsProps,
      "id" | "orderId" | "price" | "gr" | "total"
    >,
  ) => void;
  deleteDetailFromOrder?: (index: number) => void;
}

export const useNewVentaStore = create<ControladorStateProps>((set) => ({
  seller: undefined,
  zone: undefined,
  client: undefined,
  order: {
    clientId: 0,
    notes: "",
    typeInvoiceId: 0,
    details: [],
  },
  setSeller: (seller: UserProps) => {
    set({ seller, zone: undefined, client: undefined });
  },
  setZone: (zone: ZoneProps) => {
    set({ zone, client: undefined });
  },
  setClient: (client: ClientProps) => {
    set((state) => ({
      client,
      order: {
        ...state.order,
        clientId: client.id,
      } as CreateOrderProps,
    }));
  },
  setOrderNote: (notes: string) => {
    set((state) => ({
      order: {
        ...state.order,
        notes,
      } as CreateOrderProps,
    }));
  },
  setTypeInvoice: (typeInvoiceId: number) => {
    set((state) => ({
      order: {
        ...state.order,
        typeInvoiceId,
      } as CreateOrderProps,
    }));
  },
  addDetailToOrder: (
    detail: Omit<
      OrderDetailsProps,
      "id" | "orderId" | "price" | "gr" | "total"
    >,
  ) => {
    set((state) => ({
      order: {
        ...state.order,
        details: state.order?.details
          ? [...state.order.details, detail]
          : [detail],
      } as CreateOrderProps,
    }));
  },
  deleteDetailFromOrder: (index: number) => {
    set((state) => {
      if (!state.order) return state;
      const newDetails = [...state.order.details];
      newDetails.splice(index, 1);
      return {
        order: {
          ...state.order,
          details: newDetails,
        } as CreateOrderProps,
      };
    });
  },
  reset: () => {
    set({
      zone: undefined,
      client: undefined,
      order: {
        clientId: 0,
        notes: "",
        typeInvoiceId: 0,
        details: [],
      },
    });
  },
}));
