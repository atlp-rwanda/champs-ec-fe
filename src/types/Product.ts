export interface Seller {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  phone: string;
}
export interface ReviewType {
  buyerId:string;
  rating: number;
  feedback: string;
  userProfile:{
    firstName:string;
    lastName:string;
    profileImage:string;
  }
}
export interface imageType {
  imgId: string;
  URL: string;
  url?: string;
}
export interface ProductType {
  createdAt?: string;
  expireDate?: string;
  featureEndDate?: number;
  id: string;
  isAvailable?: boolean;
  isExpired?: boolean;
  isFeatured?: boolean;
  productCategory?: string;
  productCurrency: string;
  productDescription: string;
  productDiscount?: number;
  productName: string;
  productPictures: imageType[]
  productPrice: number;
  productThumbnail: string;
  reviews: ReviewType[];
  related: any;
  seller?: Seller;
  sellerId?: string; 
  stockLevel?: number;
  updatedAt?: number;
  }
  
  export interface ProductObj {
    currentPage: number;
    products: ProductType[];
    totalItems: number;
    toatalPages: number;
  }

  export interface Cards {
    key: string;
    id: string;
    productPrice: number;
    productThumbnail: string;
    productDescription: string;
    reviews:ReviewType[];
    productName:string;
  }
  export interface TableType {
    product: string;
    index: number;
    id:string;
  }
