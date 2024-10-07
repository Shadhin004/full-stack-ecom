export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string | null;
    contactNumbers: string[];
    addressLine1: string;
    addressLine2: string;
    cityId: string;
    password: string;
    userName: string;
}

export interface AddressDto {
    addressId: string;
    isDefaultAddress: boolean;
    addressLine1: string;
    addressLine2: string | null;
    cityName: string;
    cityId: string | null;
}

export interface UserDetailedDto {
    userId: string;
    firstName: string;
    lastName: string;
    email: string | null;
    userRoleId: string;
    userRoleName: string;
    isUserActive: boolean;
    contactNumbers: string[];
    addresses: AddressDto[];
    cartId: string;
}