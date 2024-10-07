export interface Variation {
    variationId: string;
    variationName: string;
    price: number;
    inventory: number;
    productId: string;
}

export interface Category {
    categoryId: string;
    categoryName: string;
    parentId: string | null;
}

export interface ReadProductReviewDto {
    reviewId: string;
    review: string | null;
    star: number | null;
    userName: string;
}

export interface GetProductByIdReadDto {
    productId: string;
    title: string;
    description: string;
    imageUrl: string | null;
    minPrice: number;
    inventory: number;
    avgStar: number;
    variation: Variation[];
    // categories: Category[];
    // productReviews: ReadProductReviewDto[];

}

export interface VariationInterface {
    variationName: string,
    price: number,
    inventory: number
}

export interface ImageInterface {
    imageUrl: string
}

export interface CategoryInterface {
    categoryId: string
}
export interface CreateProducDto {
    title: string,
    description: string,
    images: ImageInterface[],
    variations: VariationInterface[],
    productCategories: CategoryInterface[]

}

export interface UpdateVariationInterface extends VariationInterface {
    variationId: string,
    productId: string
}

export interface  UpdateImageInterface extends ImageInterface {
    imageId: string,
    productId: string
}

export interface UpdateCategoryInterface extends CategoryInterface {
    productCategoryId: string,
    productId: string
}
export interface UpdateProducDto {
    productId: string,
    title: string,
    description: string,
    images: UpdateImageInterface[],
    variations: UpdateVariationInterface[],
    productCategories: UpdateCategoryInterface[]
}