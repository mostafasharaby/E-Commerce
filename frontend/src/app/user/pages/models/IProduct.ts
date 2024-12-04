export interface IProduct {
    id?:number;
    name:string;
    price:number;
    count:number ;
    quantity:number;
    categoryID:number;
    imgUrl?:string;
    productId?:number;
    title?:string;
    description?: string;
    category?: string;
    type: string;
    sizes?: string[];
    size?:string;
    images?: string[];
    stock?: string;
    prevPrice?:number;
    discount?:number;
    totalprice?:number;
    ratings: {
      rate: number;
      count?: number;
    }

  
}

export interface ICategory {
    categoryID:number;
    name:string;
}

export interface ICategoryList {
    [key: string]: ICategory[];   // This allows for dynamic keys like "Electronics", "Men", "Women"
  }

export interface cartViewModel { 
    name:string;
    price:number;
    count:number;
    imgUrl?:string;
    quantity:number;
    categoryID:number;
    id?:number;
    title?:string;
    description?: string;
    category?: string;
    type: string;
    sizes?: string[];
    size?:string;
    images?: string[];
    stock: string;
    prevprice:number;
    discount?:number;
    totalprice?:number;
    ratings: {
      rate: number;
      count: number;
    }
   }
  export const MENU:{
    title:string;
    path:string;
    }[] =[   
    {
        title:'Men',
        path:'/category/Men'
    },
    {
        title:'Women',
        path:'/category/Women'
    },
    {
        title:'Sports',
        path:'/category/Sports'
    },
    {
        title:'Food',
        path:'/category/Food'
    },
    {
        title:'Drinks',
        path:'/category/Drinks'
    },
    {
        title:'Electronics',
        path:'/category/Electronics'
    }
  ];
  export interface CategoryFilter {
      label:string;
      value:string|number;
      checked:boolean;
      id:number;
  }
  export interface Cart {
    id?: number;
    productId?: number;
    quantity?: number;
    createdAt?: string;
    modifiedAt?: string;
    products: IProduct;
  }

  export interface CartDTO {
     id?: number;
    productId?: number;
    count?: number;   
  }
  
  export interface IWishItem {
    id?: number;
    productId?: number;   
    product: IProduct; // Reference to the IProduct interface
  }
  
  export interface IWishItemDto {
    id?: number;
    productId?: number;     
  }

  export interface IOrderDetails {
    total: number;
    paymentId?: number;
    createdAt?: string;
    modifiedAt?: string;
    orderItems?: IOrderItem[];
  }

  export interface IOrderDetails22 {
    total: number;  
    delivery: {
      recipientName?: string;
      email?: string;
      country?: string;
      city?: string;
      phoneNumber?: string;
    }| null;
  }

  export interface IOrderDetailsTestDto {
    id?: number;
    userId?: string;
    total: number;
    paymentId?: number;
    
  }
  
  export interface IOrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity?: number;
    createdAt?: string;
    modifiedAt?: string;
    product?: IProduct;
  }

  export interface IPaymentDetails {
    id: number;
    orderId?: number;
    amount?: number;
    status?: string;

  }
  
export interface User {
  id?: string; 
  userName?:string;
  email?:string;
  addressLine1?: string;
  city?: string; 
}

export interface Delivery {
  deliveryId?: string;
  recipientName?: string;
  userId?: string;
  email?: string;
  country?: string;
  city?: string;
  phoneNumber?: string;
  deliveryCost?: number;
  orderId?: number;
  order?: any; 
  user?: any; 
}

export interface Delivery2 {
  recipientName?: string; 
  email?: string;
  country?: string;
  city?: string;
  phoneNumber?: string;
}
