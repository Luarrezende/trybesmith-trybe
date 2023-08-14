export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[];
};

export type ArrayWithProduct = {
  id: number;
  userId: number;
  productIds?: number[]
};

export type SuccessOrder = {
  status: 'SUCCESSFUL', 
  data: Order[] | ArrayWithProduct[]
};

export type Error = {
  status: 'SUCCESSFUL', 
  data: string
};

export type ResultDBs = SuccessOrder | Error;